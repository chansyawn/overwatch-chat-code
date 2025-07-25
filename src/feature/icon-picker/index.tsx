"use client";

import { Editor, Transforms } from "slate";
import { ICON_DATA, type IconData } from "./constant";
import Image from "next/image";

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
      title={icon.name}
      type="button"
    >
      <Image
        width={24}
        height={24}
        src={`https://assets.overwatchitemtracker.com/textures/${icon.code}.png`}
        alt={icon.name}
      />
      <span className="text-xs hidden bg-gray-200 px-1 rounded">
        {icon.name.slice(0, 2)}
      </span>
    </button>
  );
};

export const IconSelector = ({ editor }: { editor: Editor }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-300">Icons</h3>
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3 flex">
        <div className="flex gap-2 flex-wrap mx-auto">
          {ICON_DATA.map((icon) => (
            <IconButton key={icon.code} icon={icon} editor={editor} />
          ))}
        </div>
      </div>
    </div>
  );
};
