"use client";

import { ChannelPicker, OverwatchChannel } from "@/feature/channel";
import { ChatCodeEditor } from "@/feature/editor";
import { ChatCodePreview } from "@/feature/preview";
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

  const [channel, setChannel] = useState<OverwatchChannel>(
    OverwatchChannel.All
  );

  return (
    <div className="container mx-auto">
      <main className="flex flex-col items-center max-w-[800px] mx-auto gap-2">
        <h1 className="text-5xl text-white font-bold mt-24">
          Overwatch Chat Code
        </h1>
        <ChannelPicker value={channel} onChange={setChannel} />
        <ChatCodeEditor channel={channel} value={value} onChange={setValue} />
        <ChatCodePreview value={value} channel={channel} />
      </main>
    </div>
  );
}
