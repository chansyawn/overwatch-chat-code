"use client";

import { ChatCodeEditor } from "@/feature/editor";
import { useState } from "react";
import { Descendant } from "slate";
import { Analytics } from "@vercel/analytics/next";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default function App() {
  const [value, setValue] = useState(initialValue);

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
        <ChatCodeEditor value={value} onChange={setValue} />
      </main>
      <Analytics />
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
