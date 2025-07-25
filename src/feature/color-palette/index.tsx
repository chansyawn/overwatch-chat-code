"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ButtonHTMLAttributes, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { Editor } from "slate";

const ColorButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="w-7 h-7 rounded border border-gray-600/50 bg-gray-700/30 flex items-center justify-center cursor-pointer hover:bg-gray-600/40 transition-colors text-xs"
    >
      {children}
    </button>
  );
};

const TextColorButton = ({
  color,
  editor,
}: {
  color: string;
  editor: Editor;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const marks = Editor.marks(editor);
    if (marks && marks.color) {
      Editor.removeMark(editor, "color");
    }
    Editor.addMark(editor, "color", color);
  };

  return (
    <button
      onMouseDown={handleClick}
      style={{ background: color }}
      className="w-7 h-7 rounded border border-gray-600/50 hover:scale-105 transition-transform cursor-pointer"
    />
  );
};

export const ColorPalette = ({ editor }: { editor: Editor }) => {
  const [colors, setColors] = useState<string[]>([
    "rgba(255, 255, 255, 1",
    "rgba(0, 195, 255, 1)",
    "rgba(0, 218, 0, 1)",
    "rgba(255, 152, 67, 1)",
    "rgba(244, 130, 255, 1)",
  ]);
  const [color, setColor] = useState<string>("#FFFFFF33");

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <span className="text-sm text-gray-400">Color:</span>
      <ColorButton onClick={() => Editor.removeMark(editor, "color")}>
        ✕
      </ColorButton>
      {colors.map((color, idx) => (
        <TextColorButton
          key={`${color}_${idx}`}
          color={color}
          editor={editor}
        />
      ))}
      <Popover className="relative">
        <PopoverButton as="div">
          <ColorButton>+</ColorButton>
        </PopoverButton>
        <PopoverPanel
          anchor="bottom"
          className="shadow-lg rounded-lg p-4 bg-gray-800 border border-gray-700/50 mt-2"
        >
          <ColorPicker
            value={color}
            style={{ body: { backgroundColor: "transparent" } }}
            onChange={setColor}
            hideInputs
            hideEyeDrop
            hideAdvancedSliders
            hideColorGuide
            hideInputType
            hideGradientType
            hideGradientAngle
            hideColorTypeBtns
            config={{
              defaultGradient:
                "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 100%)",
            }}
          />
          <button
            className="w-full px-3 py-2 rounded-md text-sm bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors mt-3"
            onClick={() => setColors([...colors, color])}
          >
            Add Color
          </button>
        </PopoverPanel>
      </Popover>
    </div>
  );
};
