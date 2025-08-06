"use client";

import { ChatCodeEditor } from "@/feature/editor";
import { ColorPalette } from "@/feature/color-palette";
import { ChannelPicker, OverwatchChannel } from "@/feature/channel";
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
            focus: Editor.end(editor, []),
          },
        });

        // 插入模板内容
        if (templateContent.length > 0) {
          Transforms.insertNodes(editor, templateContent, { at: [0] });
        } else {
          // 如果没有模板内容，插入一个空段落
          Transforms.insertNodes(editor, {
            type: "paragraph",
            children: [{ text: "" }],
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
    <div className="min-h-screen px-2 sm:px-4 py-4 sm:py-8 flex flex-col">
      <main className="flex flex-col items-center mx-auto container flex-grow">
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-white font-semibold mb-2">
            Overwatch Chat Code Generator
          </h1>
          <p className="text-green-400 text-lg font-semibold mb-2 border-2 border-green-400 rounded-lg p-3 bg-green-400/10">
            😭 This bug was fixed by Blizzard on 2025/8/5. Hope it returns as an
            official feature one day! 😭
          </p>
        </div>
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
            <div className="w-full lg:w-1/3 space-y-3 sm:space-y-4 lg:flex-shrink-0">
              <ChannelPicker value={channel} onChange={setChannel} />
              <ColorPalette editor={editor} />
              <div className="w-full bg-gray-800/30 border border-gray-700/50 p-3 sm:p-4 rounded-lg min-h-48 sm:min-h-64">
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
            <div className="w-full lg:w-2/3">
              <IconSelector editor={editor} />
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-4 sm:mt-8 pt-4 sm:pt-8 border-t border-gray-700/50">
        <div className="text-center space-y-4">
          <div className="space-y-3">
            <p className="text-gray-300 text-sm">
              Special thanks to the Overwatch community for sharing chat codes
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm">
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
              <span className="text-gray-500 hidden sm:inline">•</span>
              <a
                href="https://x.com/bageloverwatch/status/1948213523890278550"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors underline"
              >
                @bageloverwatch on X
              </a>
            </div>
          </div>
          <a
            href="https://github.com/chansyawn/overwatch-chat-code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors flex items-center gap-1 justify-center text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View Source Code on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
