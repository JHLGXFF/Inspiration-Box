import { useState } from "react";

import { createMemo } from "../services/api";

type MemoFormProps = {
  onCreated?: () => void;
};

export default function MemoForm({ onCreated }: MemoFormProps) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const trimmed = content.trim();
    if (!trimmed) {
      setError("Please enter some content.");
      return;
    }

    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    try {
      setSubmitting(true);
      await createMemo({ content: trimmed, tags: tagList });
      setContent("");
      setTags("");
      onCreated?.();
    } catch (err) {
      setError("Failed to create memo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="content">
          Memo content
        </label>
        <textarea
          id="content"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none"
          rows={3}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="tags">
          Tags (comma separated)
        </label>
        <input
          id="tags"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-black focus:outline-none"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
      >
        {submitting ? "Saving..." : "Save memo"}
      </button>
    </form>
  );
}
