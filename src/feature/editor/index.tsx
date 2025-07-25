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
import { IconSelector } from "../icon-picker";
import { CHANNEL_COLOR, OverwatchChannel } from "../channel";
import Image from "next/image";

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
            src={element.icon.source}
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

  return (
    <div className="w-full flex flex-col gap-2">
      <Slate editor={editor} initialValue={value} onChange={onChange}>
        <div className="flex flex-wrap gap-2">
          <IconSelector editor={editor} />
          <ColorPalette editor={editor} />
        </div>
        <Editable
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          style={{ color: CHANNEL_COLOR[channel] }}
          className="w-full border bg-gray-500/20 border-gray-500/30 p-4 rounded-xl min-h-96 outline-none"
        />
      </Slate>
    </div>
  );
};
