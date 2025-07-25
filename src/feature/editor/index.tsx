"use client";

import React, { useMemo, useCallback } from "react";
import { createEditor, Descendant, Editor } from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
} from "slate-react";
import { withHistory } from "slate-history";
import { ColorPalette } from "../color-palette";
import { CHANNEL_COLOR, OverwatchChannel } from "../channel";
import Image from "next/image";
import { ICON_DATA, type IconData } from "../icon-picker/constant";
import { Transforms } from "slate";

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>;
  }

  return <span {...attributes}>{children}</span>;
};

const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "icon":
      return (
        <span contentEditable={false} {...attributes}>
          <Image
            className="inline-block"
            src={`https://assets.overwatchitemtracker.com/textures/${element.icon.code}.png`}
            alt={element.icon.name}
            width={16}
            height={16}
          />
        </span>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

type ChatCodeEditorProps = {
  channel: OverwatchChannel;
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
};

const withInline = (editor: Editor) => {
  const { isInline, isElementReadOnly, isSelectable } = editor;

  editor.isInline = (element) => element.type === "icon" || isInline(element);

  editor.isElementReadOnly = (element) =>
    element.type === "icon" || isElementReadOnly(element);

  editor.isSelectable = (element) =>
    element.type !== "icon" && isSelectable(element);

  return editor;
};

export const ChatCodeEditor = ({
  channel,
  value,
  onChange,
}: ChatCodeEditorProps) => {
  const editor = useMemo(
    () => withInline(withReact(withHistory(createEditor()))),
    []
  );

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const renderElement = useCallback((props: RenderElementProps) => {
    return <Element {...props} />;
  }, []);

  const handleIconClick = useCallback((icon: IconData) => {
    Transforms.insertNodes(editor, {
      type: "icon",
      icon,
      children: [{ text: "" }],
    });
  }, [editor]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Slate editor={editor} initialValue={value} onChange={onChange}>
        <div className="flex gap-4">
          {/* 左侧编辑器区域 */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <ColorPalette editor={editor} />
            </div>
            <Editable
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              style={{ color: CHANNEL_COLOR[channel] }}
              className="w-full border bg-gray-500/20 border-gray-500/30 p-4 rounded-xl min-h-96 outline-none"
            />
          </div>
          
          {/* 右侧图标面板 */}
          <div className="w-64 flex flex-col gap-2">
            <h3 className="text-sm font-medium text-white">英雄图标</h3>
            <div className="grid grid-cols-4 gap-2 p-3 bg-white border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
              {ICON_DATA.map((icon) => (
                <button
                  key={icon.code}
                  onClick={() => handleIconClick(icon)}
                  className="size-12 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  title={icon.name}
                  type="button"
                >
                  <Image
                    width={20}
                    height={20}
                    src={`https://assets.overwatchitemtracker.com/textures/${icon.code}.png`}
                    alt={icon.name}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Slate>
    </div>
  );
};
