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
      className="size-6 rounded-lg border border-gray-300 flex items-center justify-center cursor-pointer bg-white"
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
    <ColorButton
      onMouseDown={handleClick}
      style={{ background: color }}
      className="size-6 rounded-full border border-gray-300"
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
    <div>
      <div className="flex gap-2 w-full flex-wrap">
        <ColorButton onClick={() => Editor.removeMark(editor, "color")}>
          🚫
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
            className="shadow rounded-lg p-3 bg-white"
          >
            <ColorPicker
              value={color}
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
              className="px-2 py-1 rounded-md text-sm bg-neutral-200 mt-1"
              onClick={() => setColors([...colors, color])}
            >
              Add
            </button>
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  );
};
