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
    <div className="w-full space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Generated Code</h3>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            copied
              ? "bg-green-600/20 border border-green-500/30 text-green-400"
              : "bg-gray-700/50 border border-gray-600/50 text-gray-300 hover:bg-gray-600/50"
          }`}
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
        <pre className="whitespace-pre-wrap text-gray-200 text-sm font-mono">
          {result || "Your generated code will appear here..."}
        </pre>
      </div>
    </div>
  );
};
