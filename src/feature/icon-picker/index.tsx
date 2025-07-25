"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
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
      className="size-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
      title={icon.name}
      type="button"
    >
      <Image width={16} height={16} src={icon.source} alt={icon.name} />
      <span className="text-xs hidden bg-gray-200 px-1 rounded">
        {icon.name.slice(0, 2)}
      </span>
    </button>
  );
};

export const IconSelector = ({ editor }: { editor: Editor }) => {
  return (
    <Popover className="relative">
      <PopoverButton className="cursor-pointer size-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
        😀
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className="shadow-lg rounded-lg p-3 bg-white border border-gray-200 z-10 [--anchor-gap:--spacing(2)]"
      >
        <div className="grid grid-cols-3 gap-2 max-w-xs">
          {ICON_DATA.map((icon, idx) => (
            <IconButton
              key={`${icon.code}_${idx}`}
              icon={icon}
              editor={editor}
            />
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  );
};
