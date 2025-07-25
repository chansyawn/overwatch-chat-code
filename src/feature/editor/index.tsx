"use client";

import React, { useMemo, useCallback, useState } from "react";
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
import { CHANNEL_COLOR, ChannelPicker, OverwatchChannel } from "../channel";
import Image from "next/image";
import { IconSelector } from "../icon-picker";
import { ChatCodePreview } from "../preview";

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
            alt={element.icon.code}
            width={24}
            height={24}
          />
        </span>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
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

type ChatCodeEditorProps = {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
};

export const ChatCodeEditor = ({ value, onChange }: ChatCodeEditorProps) => {
  const [channel, setChannel] = useState<OverwatchChannel>(
    OverwatchChannel.All
  );

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

  return (
    <div className="w-full">
      <Slate editor={editor} initialValue={value} onChange={onChange}>
        <div className="flex gap-6">
          <div className="flex-1 space-y-4">
            <ChannelPicker value={channel} onChange={setChannel} />
            <ColorPalette editor={editor} />
            <Editable
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              style={{ color: CHANNEL_COLOR[channel] }}
              className="w-full bg-gray-800/30 border border-gray-700/50 p-4 rounded-lg min-h-64 outline-none focus:border-gray-600/50 transition-colors"
              placeholder="Type your message here..."
            />
            <ChatCodePreview value={value} channel={channel} />
          </div>
          <div className="flex-2">
            <IconSelector editor={editor} />
          </div>
        </div>
      </Slate>
    </div>
  );
};
