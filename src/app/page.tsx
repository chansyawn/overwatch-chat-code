"use client";

import { ChatCodeEditor } from "@/feature/editor";
import { useState } from "react";
import { Descendant } from "slate";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "Input text here" }],
  },
];

export default function App() {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="min-h-screen px-4 py-8">
      <main className="flex flex-col items-center mx-auto container">
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
    </div>
  );
}
