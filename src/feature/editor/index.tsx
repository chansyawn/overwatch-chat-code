"use client";

import React, { useMemo, useCallback } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { withHistory } from "slate-history";
import { ColorPalette } from "./color-palette";
import { CHANNEL_COLOR, OverwatchChannel } from "../channel";

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>;
  }

  return <span {...attributes}>{children}</span>;
};

type ChatCodeEditorProps = {
  channel: OverwatchChannel;
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
};

export const ChatCodeEditor = ({
  channel,
  value,
  onChange,
}: ChatCodeEditorProps) => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <Slate editor={editor} initialValue={value} onChange={onChange}>
        <div>
          <ColorPalette editor={editor} />
        </div>
        <Editable
          renderLeaf={renderLeaf}
          style={{ color: CHANNEL_COLOR[channel] }}
          className="w-full border border-gray-300 rounded-md p-2 bg-gray-800"
        />
      </Slate>
    </div>
  );
};
