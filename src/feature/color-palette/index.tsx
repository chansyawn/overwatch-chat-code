"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ButtonHTMLAttributes, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { Editor, Range, Transforms } from "slate";
import { isGradient, generateGradientColors } from "./color";
import { DEFAULT_COLORS, usePersistedColors } from "./storage";

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
  onRemove,
  canRemove = false,
}: {
  color: string;
  editor: Editor;
  onRemove?: () => void;
  canRemove?: boolean;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isGradient(color)) {
      applyGradientToSelection(editor, color);
      return;
    } else {
      const marks = Editor.marks(editor);
      if (marks && marks.color) {
        Editor.removeMark(editor, "color");
      }
      Editor.addMark(editor, "color", color);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <div className="relative group">
      <ColorButton onMouseDown={handleClick} style={{ background: color }} />
      {canRemove && (
        <button
          onClick={handleRemove}
          className="cursor-pointer absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs leading-none opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
        >
          ✕
        </button>
      )}
    </div>
  );
};

// 应用渐变到选中文字
const applyGradientToSelection = (editor: Editor, gradientColor: string) => {
  if (!editor.selection || Range.isCollapsed(editor.selection)) {
    return; // 没有选中内容，直接返回
  }

  // 获取选中的文本
  const selectedText = Editor.string(editor, editor.selection);

  if (!selectedText) {
    return; // 没有文本内容，直接返回
  }

  // 使用 generateGradientColors 生成颜色数组
  const colors = generateGradientColors(gradientColor, selectedText.length);

  // 删除选中的内容
  Transforms.delete(editor);

  // 为每个字符创建带有颜色标记的文本节点并插入
  const textNodes = selectedText.split("").map((char, index) => ({
    text: char,
    color: colors[index],
  }));

  Transforms.insertNodes(editor, textNodes);
};

export const ColorPalette = ({ editor }: { editor: Editor }) => {
  const { colors, addColor, removeColor } = usePersistedColors();
  const [color, setColor] = useState<string>("#FFFFFF33");

  const handleAddColor = () => {
    addColor(color);
  };

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <span className="text-sm text-gray-400">Color:</span>
      <ColorButton onClick={() => Editor.removeMark(editor, "color")}>
        ✕
      </ColorButton>
      {colors.map((colorItem, idx) => (
        <TextColorButton
          key={`${colorItem}_${idx}`}
          color={colorItem}
          editor={editor}
          onRemove={() => removeColor(idx)}
          canRemove={idx >= DEFAULT_COLORS.length}
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
            disableLightMode
            config={{
              defaultGradient:
                "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 100%)",
            }}
          />
          <button
            className="w-full px-3 py-2 rounded-md text-sm bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors mt-3"
            onClick={handleAddColor}
          >
            Add Color
          </button>
        </PopoverPanel>
      </Popover>
    </div>
  );
};
