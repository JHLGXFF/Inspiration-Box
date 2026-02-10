import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import MemoCard from "../components/MemoCard";
import MemoForm from "../components/MemoForm";
import TagFilter from "../components/TagFilter";
import { deleteMemo, listMemos, type Memo, updateMemo } from "../services/api";

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editError, setEditError] = useState<string | null>(null);
  const [editSubmitting, setEditSubmitting] = useState(false);

  async function loadMemos(tag?: string | null) {
    try {
      setLoading(true);
      setError(null);
      const items = await listMemos(tag ?? undefined);
      setMemos(items);
    } catch (err) {
      setError("Failed to load memos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMemos(activeTag);
  }, [activeTag]);

  const allTags = useMemo(() => {
    const unique = new Set<string>();
    for (const memo of memos) {
      for (const tag of memo.tags) {
        unique.add(tag);
      }
    }
    return Array.from(unique).sort();
  }, [memos]);

  const emptyMessage = activeTag
    ? `No memos tagged "${activeTag}".`
    : "No memos yet.";

  function startEdit(memo: Memo) {
    setEditingMemo(memo);
    setEditContent(memo.content);
    setEditTags(memo.tags.join(", "));
    setEditError(null);
  }

  function cancelEdit() {
    setEditingMemo(null);
    setEditContent("");
    setEditTags("");
    setEditError(null);
  }

  async function handleEditSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!editingMemo) {
      return;
    }
    const trimmed = editContent.trim();
    if (!trimmed) {
      setEditError("Please enter some content.");
      return;
    }

    const tagList = editTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    try {
      setEditSubmitting(true);
      await updateMemo(editingMemo.id, { content: trimmed, tags: tagList });
      cancelEdit();
      await loadMemos(activeTag);
    } catch (err) {
      setEditError("Failed to update memo.");
    } finally {
      setEditSubmitting(false);
    }
  }

  async function handleDelete(memo: Memo) {
    const confirmed = window.confirm("Delete this memo?");
    if (!confirmed) {
      return;
    }
    try {
      await deleteMemo(memo.id);
      await loadMemos(activeTag);
    } catch (err) {
      setError("Failed to delete memo.");
    }
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      <header className="space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Inspiration Box</h1>
          <Link to="/profile" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            My Profile
          </Link>
        </div>
        <p className="text-sm text-gray-600">
          Capture quick ideas, links, and notes in one place.
        </p>
      </header>

      <MemoForm onCreated={() => loadMemos(activeTag)} />

      {editingMemo ? (
        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Edit memo</h2>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          <form className="mt-3 space-y-3" onSubmit={handleEditSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="edit-content">
                Memo content
              </label>
              <textarea
                id="edit-content"
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none"
                rows={3}
                value={editContent}
                onChange={(event) => setEditContent(event.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="edit-tags">
                Tags (comma separated)
              </label>
              <input
                id="edit-tags"
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none"
                value={editTags}
                onChange={(event) => setEditTags(event.target.value)}
              />
            </div>

            {editError ? <p className="text-sm text-red-600">{editError}</p> : null}

            <button
              type="submit"
              disabled={editSubmitting}
              className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {editSubmitting ? "Saving..." : "Save changes"}
            </button>
          </form>
        </section>
      ) : null}

      <section className="space-y-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Recent memos</h2>
          <TagFilter
            tags={allTags}
            activeTag={activeTag}
            onSelect={setActiveTag}
          />
        </div>
        {loading ? <p className="text-sm text-gray-500">Loading...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {!loading && !error && memos.length === 0 ? (
          <p className="text-sm text-gray-500">{emptyMessage}</p>
        ) : null}
        <div className="grid gap-4">
          {memos.map((memo) => (
            <MemoCard
              key={memo.id}
              content={memo.content}
              tags={memo.tags}
              createdAt={memo.created_at}
              onEdit={() => startEdit(memo)}
              onDelete={() => handleDelete(memo)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
