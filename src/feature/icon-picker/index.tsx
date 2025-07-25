"use client";

import { Editor, Transforms } from "slate";
import { ICON_DATA, type IconData, HeroTag, TypeTag } from "./constant";
import Image from "next/image";
import { useState, useMemo } from "react";

const IconButton = ({ icon, editor }: { icon: IconData; editor: Editor }) => {
  const handleClick = () => {
    Transforms.insertNodes(editor, {
      type: "icon",
      icon,
      children: [{ text: "" }],
    });
  };

  return (
    <button
      onClick={handleClick}
      className="w-10 h-10 rounded border border-gray-600/50 bg-gray-700/30 flex items-center justify-center hover:bg-gray-600/50 transition-colors"
      title={icon.tags.join(", ")}
      type="button"
    >
      <Image
        width={24}
        height={24}
        src={`https://assets.overwatchitemtracker.com/textures/${icon.code}.png`}
        alt={icon.code}
      />
    </button>
  );
};

const TagFilter = ({
  allTags,
  selectedTags,
  onTagToggle,
}: {
  allTags: string[];
  selectedTags: Set<string>;
  onTagToggle: (tag: string) => void;
}) => {
  // 分离英雄标签和类型标签
  const heroTags = allTags.filter((tag) =>
    Object.values(HeroTag).includes(tag as HeroTag)
  );
  const typeTags = allTags.filter((tag) =>
    Object.values(TypeTag).includes(tag as TypeTag)
  );

  const TagRow = ({ tags, title }: { tags: string[]; title: string }) => (
    <div className="space-y-1">
      <h5 className="text-xs font-medium text-gray-500">{title}</h5>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              selectedTags.has(tag)
                ? "bg-blue-600 text-white"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
            }`}
            type="button"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium text-gray-400">Filter</h4>
        {selectedTags.size > 0 && (
          <button
            onClick={() => selectedTags.forEach((tag) => onTagToggle(tag))}
            className="text-xs text-gray-400 hover:text-gray-300 underline"
            type="button"
          >
            Clear
          </button>
        )}
      </div>
      <div className="space-y-3 overflow-y-auto">
        <TagRow tags={heroTags} title="Hero" />
        <TagRow tags={typeTags} title="Type" />
      </div>
    </div>
  );
};

export const IconSelector = ({ editor }: { editor: Editor }) => {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    ICON_DATA.forEach((icon) => {
      icon.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const filteredIcons = useMemo(() => {
    if (selectedTags.size === 0) {
      return ICON_DATA;
    }
    return ICON_DATA.filter((icon) =>
      icon.tags.some((tag) => selectedTags.has(tag))
    );
  }, [selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => {
      const newTags = new Set(prev);
      if (newTags.has(tag)) {
        newTags.delete(tag);
      } else {
        newTags.add(tag);
      }
      return newTags;
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-300">Icons</h3>
      <TagFilter
        allTags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
      />
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3 flex">
        <div className="flex gap-2 flex-wrap mx-auto">
          {filteredIcons.map((icon) => (
            <IconButton key={icon.code} icon={icon} editor={editor} />
          ))}
        </div>
      </div>
    </div>
  );
};
