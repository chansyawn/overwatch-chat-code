import { Descendant } from "slate";
import { useState } from "react";
import { rgbaToHex } from "../color-palette/color";
import { CHANNEL_COLOR, OverwatchChannel } from "../channel";

type ChatCodePreviewProps = {
  channel: OverwatchChannel;
  value: Descendant[];
};

export const ChatCodePreview = ({ channel, value }: ChatCodePreviewProps) => {
  const [copied, setCopied] = useState(false);

  const renderDescendant = (descendant: Descendant) => {
    if ("type" in descendant && descendant.type === "paragraph") {
      let lastTextHaveColor = false;
      return descendant.children.map((item) => {
        if ("type" in item) {
          if (item.type === "icon") {
            return `<TXC00${item.icon.code}>`;
          }
          if (item.type === "paragraph") {
            return "";
          }
        }
        if (item.color) {
          const hex = rgbaToHex(item.color);
          lastTextHaveColor = true;
          return `<FG${hex.slice(1)}>${item.text}`;
        }
        if (lastTextHaveColor) {
          const hex = rgbaToHex(CHANNEL_COLOR[channel]);
          return `<FG${hex.slice(1)}>${item.text}`;
        }
        return item.text;
      });
    }
    return [];
  };

  const result = value
    .map((item) => renderDescendant(item).join(""))
    .join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="text-white text-xl">Code</div>
        <button
          onClick={handleCopy}
          className={`px-3 py-1 rounded border ${
            copied
              ? "bg-green-600 border-green-500 text-white"
              : "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="whitespace-pre-wrap text-white bg-gray-500/20 border border-gray-500/30 p-4 rounded-xl">
        {result}
      </div>
    </div>
  );
};
