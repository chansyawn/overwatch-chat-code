"use client";

import { Editor, Transforms } from "slate";
import {
  ICON_DATA,
  type IconData,
  HeroTag,
  TypeTag,
  SpecialTag,
} from "./constant";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useCustomIcons } from "./storage";
import { CustomIconAdder } from "./custom";

type FilterMode = "AND" | "OR";

const IconButton = ({
  icon,
  editor,
  isCustom = false,
  onDelete,
}: {
  icon: IconData;
  editor: Editor;
  isCustom?: boolean;
  onDelete?: () => void;
}) => {
  const handleClick = () => {
    Transforms.insertNodes(editor, {
      type: "icon",
      icon,
      children: [{ text: "" }],
    });
  };

  return (
    <div className="relative group">
      <button
        onClick={handleClick}
        className="w-10 h-10 rounded border border-gray-600/50 bg-gray-700/30 flex items-center justify-center hover:bg-gray-600/50 transition-colors"
        title={`${icon.code} - ${icon.tags.join(", ")}`}
        type="button"
      >
        <Image
          width={24}
          height={24}
          src={`https://assets.overwatchitemtracker.com/textures/${icon.code}.png`}
          alt={icon.code}
          unoptimized
        />
      </button>
      {isCustom && onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 hover:bg-red-700 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          title="Delete custom icon"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
};

const TagFilter = ({
  allTags,
  selectedTags,
  onTagToggle,
  filterMode,
  onFilterModeChange,
}: {
  allTags: string[];
  selectedTags: Set<string>;
  onTagToggle: (tag: string) => void;
  filterMode: FilterMode;
  onFilterModeChange: (mode: FilterMode) => void;
}) => {
  // 分离不同类型的标签
  const heroTags = allTags.filter((tag) =>
    Object.values(HeroTag).includes(tag as HeroTag)
  );
  const typeTags = allTags.filter((tag) =>
    Object.values(TypeTag).includes(tag as TypeTag)
  );
  const specialTags = allTags.filter((tag) =>
    Object.values(SpecialTag).includes(tag as SpecialTag)
  );

  const TagRow = ({ tags, title }: { tags: string[]; title: string }) => {
    if (tags.length === 0) return null;

    return (
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
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium text-gray-400 flex items-center gap-2">
          Filter
          <div className="space-y-1">
            <div className="flex gap-1">
              <button
                onClick={() => onFilterModeChange("OR")}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  filterMode === "OR"
                    ? "bg-green-600 text-white"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
                type="button"
                title="Show icons that have ANY selected tag"
              >
                OR
              </button>
              <button
                onClick={() => onFilterModeChange("AND")}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  filterMode === "AND"
                    ? "bg-green-600 text-white"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
                type="button"
                title="Show icons that have ALL selected tags"
              >
                AND
              </button>
            </div>
          </div>
        </h4>
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
        <TagRow tags={specialTags} title="Special" />
      </div>
    </div>
  );
};

export const IconSelector = ({ editor }: { editor: Editor }) => {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [filterMode, setFilterMode] = useState<FilterMode>("OR");
  const { customIcons, addCustomIcon, removeCustomIcon } = useCustomIcons();

  // 合并默认图标和自定义图标
  const allIcons = useMemo(() => {
    return [...ICON_DATA, ...customIcons];
  }, [customIcons]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allIcons.forEach((icon) => {
      icon.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allIcons]);

  const filteredIcons = useMemo(() => {
    if (selectedTags.size === 0) {
      return allIcons;
    }

    return allIcons.filter((icon) => {
      if (filterMode === "AND") {
        // AND logic: icon must have ALL selected tags
        return Array.from(selectedTags).every((tag) =>
          icon.tags.some((iconTag) => iconTag === tag)
        );
      } else {
        // OR logic: icon must have ANY selected tag
        return icon.tags.some((tag) => selectedTags.has(tag));
      }
    });
  }, [allIcons, selectedTags, filterMode]);

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

  const handleAddCustomIcon = (icon: IconData) => {
    const result = addCustomIcon(icon);
    if (!result.success) {
      alert(result.error);
    }
  };

  const handleDeleteCustomIcon = (codeToDelete: string) => {
    removeCustomIcon(codeToDelete);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-300">Icons</h3>
      <CustomIconAdder onAddCustomIcon={handleAddCustomIcon} />
      <TagFilter
        allTags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        filterMode={filterMode}
        onFilterModeChange={setFilterMode}
      />
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3 flex">
        <div className="flex gap-2 flex-wrap mx-auto">
          {filteredIcons.map((icon) => {
            const isCustom = customIcons.some(
              (customIcon) => customIcon.code === icon.code
            );
            return (
              <IconButton
                key={icon.code}
                icon={icon}
                editor={editor}
                isCustom={isCustom}
                onDelete={
                  isCustom ? () => handleDeleteCustomIcon(icon.code) : undefined
                }
              />
            );
          })}
        </div>
      </div>

      {filteredIcons.length === 0 && (
        <div className="text-center text-gray-500 text-sm py-4">
          No icons found matching the selected filters.
        </div>
      )}
    </div>
  );
};
