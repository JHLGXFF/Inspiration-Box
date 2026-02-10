type MemoCardProps = {
  content: string;
  createdAt: string;
  tags: string[];
  onEdit: () => void;
  onDelete: () => void;
};

export default function MemoCard({
  content,
  createdAt,
  tags,
  onEdit,
  onDelete,
}: MemoCardProps) {
  const dateLabel = new Date(createdAt).toLocaleString();

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <p className="whitespace-pre-wrap text-sm text-gray-800">{content}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.length ? (
          tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400">No tags</span>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-400">{dateLabel}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
