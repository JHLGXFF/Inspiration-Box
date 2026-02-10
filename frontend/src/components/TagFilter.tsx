type TagFilterProps = {
  tags: string[];
  activeTag: string | null;
  onSelect: (tag: string | null) => void;
};

export default function TagFilter({ tags, activeTag, onSelect }: TagFilterProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={
          activeTag === null
            ? "rounded-full bg-black px-3 py-1 text-xs font-semibold text-white"
            : "rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
        }
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onSelect(tag)}
          className={
            activeTag === tag
              ? "rounded-full bg-black px-3 py-1 text-xs font-semibold text-white"
              : "rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
          }
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
