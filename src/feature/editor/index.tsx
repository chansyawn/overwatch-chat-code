"use client";

import React, { useCallback } from "react";
import { Descendant, Editor } from "slate";
import {
  Slate,
  Editable,
  RenderLeafProps,
  RenderElementProps,
} from "slate-react";
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
            src={`https://assets.overwatchitemtracker.com/textures/${element.icon.code}.png`}
            alt={element.icon.code}
            width={24}
            height={24}
            unoptimized
          />
        </span>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

type ChatCodeEditorProps = {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  editor: Editor;
  channel: OverwatchChannel;
};

export const ChatCodeEditor = ({ 
  value, 
  onChange, 
  editor, 
  channel 
}: ChatCodeEditorProps) => {
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const renderElement = useCallback((props: RenderElementProps) => {
    return <Element {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={value} onChange={onChange}>
      <Editable
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        style={{ color: CHANNEL_COLOR[channel] }}
        className="w-full h-full outline-none"
        placeholder="Type your message here..."
      />
    </Slate>
  );
};
