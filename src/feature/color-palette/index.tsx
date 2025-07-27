"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ButtonHTMLAttributes, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { Editor, Range, Transforms, Text, Element, Node } from "slate";
import { isGradient, generateGradientColors } from "./color";
import { DEFAULT_COLORS, usePersistedColors } from "./storage";

const ColorButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="w-7 h-7 rounded border border-gray-600 bg-gray-700/30 flex items-center justify-center cursor-pointer hover:bg-gray-600/40 transition-colors text-xs"
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

  // 获取选中区域的片段
  const fragment = Editor.fragment(editor, editor.selection);
  
  // 收集所有文本字符和节点信息
  const processedNodes: Node[] = [];
  const allTextChars: string[] = [];
  
  const processNode = (node: Node): void => {
    if (Text.isText(node)) {
      // 收集文本字符用于生成渐变色
      allTextChars.push(...node.text.split(''));
      processedNodes.push(node);
    } else if (Element.isElement(node) && 'type' in node && node.type === 'icon') {
      // 保存图标节点
      processedNodes.push(node);
    } else if (Element.isElement(node) && node.children) {
      // 递归处理子节点
      node.children.forEach(processNode);
    }
  };

  // 处理片段中的所有节点
  fragment.forEach(processNode);

  if (allTextChars.length === 0) {
    return; // 没有文本内容，直接返回
  }

  // 使用 generateGradientColors 生成颜色数组
  const colors = generateGradientColors(gradientColor, allTextChars.length);

  // 重新构建节点，为文本应用渐变，保持图标不变
  const newNodes: Node[] = [];
  let colorIndex = 0;

  const rebuildNode = (node: Node): void => {
    if (Text.isText(node)) {
      // 为文本节点的每个字符应用渐变色
      const textChars = node.text.split('');
      textChars.forEach((char: string) => {
        newNodes.push({
          text: char,
          color: colors[colorIndex],
        } as Node);
        colorIndex++;
      });
    } else if (Element.isElement(node) && 'type' in node && node.type === 'icon') {
      // 保持图标节点不变
      newNodes.push(node);
    } else if (Element.isElement(node) && node.children) {
      // 递归处理子节点
      node.children.forEach(rebuildNode);
    }
  };

  // 重建所有节点
  fragment.forEach(rebuildNode);

  // 删除选中的内容
  Transforms.delete(editor);

  // 插入新的节点
  Transforms.insertNodes(editor, newNodes);
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
