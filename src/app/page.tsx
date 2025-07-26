"use client";

import { ChatCodeEditor } from "@/feature/editor";
import { ColorPalette } from "@/feature/color-palette";
import { CHANNEL_COLOR, ChannelPicker, OverwatchChannel } from "@/feature/channel";
import { IconSelector } from "@/feature/icon-picker";
import { ChatCodePreview } from "@/feature/preview";
import { useState, useMemo, useCallback } from "react";
import { Descendant, createEditor, Editor, Transforms } from "slate";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const withInline = (editor: Editor) => {
  const { isInline, isElementReadOnly, isSelectable } = editor;

  editor.isInline = (element) => element.type === "icon" || isInline(element);

  editor.isElementReadOnly = (element) =>
    element.type === "icon" || isElementReadOnly(element);

  editor.isSelectable = (element) =>
    element.type !== "icon" && isSelectable(element);

  return editor;
};

export default function App() {
  const [value, setValue] = useState(initialValue);
  const [channel, setChannel] = useState<OverwatchChannel>(
    OverwatchChannel.All
  );

  const editor = useMemo(
    () => withInline(withReact(withHistory(createEditor()))),
    []
  );

  const handleApplyTemplate = useCallback(
    (templateContent: Descendant[]) => {
      Editor.withoutNormalizing(editor, () => {
        // 清空编辑器内容
        const point = { path: [0, 0], offset: 0 };
        Transforms.select(editor, point);
        Transforms.delete(editor, {
          at: {
            anchor: point,
            focus: Editor.end(editor, [])
          }
        });
        
        // 插入模板内容
        if (templateContent.length > 0) {
          Transforms.insertNodes(editor, templateContent, { at: [0] });
        } else {
          // 如果没有模板内容，插入一个空段落
          Transforms.insertNodes(editor, {
            type: 'paragraph',
            children: [{ text: '' }]
          });
        }
        
        // 将光标移动到开始位置
        Transforms.select(editor, { path: [0, 0], offset: 0 });
      });
      
      // 调用 setValue 来更新外部状态
      setValue(templateContent);
    },
    [editor]
  );

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col">
      <main className="flex flex-col items-center mx-auto container flex-grow">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-white font-semibold mb-2">
            Overwatch Chat Code
          </h1>
          <p className="text-gray-400 text-sm">
            Create chat messages with colors and icons
          </p>
        </div>
        
        <div className="w-full">
          <div className="flex gap-6">
            <div className="w-1/3 space-y-4 flex-shrink-0">
              <ChannelPicker value={channel} onChange={setChannel} />
              <ColorPalette editor={editor} />
              <div className="w-full bg-gray-800/30 border border-gray-700/50 p-4 rounded-lg min-h-64">
                <ChatCodeEditor 
                  value={value} 
                  onChange={setValue} 
                  editor={editor}
                  channel={channel}
                />
              </div>
              <ChatCodePreview
                value={value}
                channel={channel}
                onApplyTemplate={handleApplyTemplate}
              />
            </div>
            <div className="w-2/3">
              <IconSelector editor={editor} />
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-8 pt-8 border-t border-gray-700">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">Thanks to:</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <a
              href="https://www.reddit.com/r/Overwatch/comments/1m7xf3i/list_of_chat_emojis_ive_found_so_far"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              Reddit: List of chat emojis
            </a>
            <span className="text-gray-500 hidden sm:inline">•</span>
            <a
              href="https://texture-viewer.overwatchitemtracker.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              Overwatch Item Tracker
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
