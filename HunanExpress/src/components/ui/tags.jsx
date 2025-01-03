import React, { useState } from "react";

export default function Tags({ tags, onTagClick }) {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagClick = (tagName) => {
    setSelectedTag(tagName);
    onTagClick?.(tagName);
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 flex overflow-x-auto whitespace-nowrap py-2 px-4 shadow-sm">
      {tags.map((tag) => (
        <div
          key={tag.name}
          className={`relative mx-2 px-3 py-1 bg-gray-100 font-semibold cursor-pointer transition duration-150 
          ${
            selectedTag === tag.name
              ? 'text-red-700 after:content-[""] after:block after:absolute after:h-[3px] after:w-[calc(100%-12px)] after:rounded-t-lg after:bg-red-500 after:left-1.5 after:bottom-0'
              : "text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => handleTagClick(tag.name)}
        >
          {tag.name}
          {` (${tag.count})`}
        </div>
      ))}
    </div>
  );
}
