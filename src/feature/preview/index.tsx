import { Descendant } from "slate";
import { rgbaToHex } from "../color-palette/color";
import { CHANNEL_COLOR, OverwatchChannel } from "../channel";

type ChatCodePreviewProps = {
  channel: OverwatchChannel;
  value: Descendant[];
};

export const ChatCodePreview = ({ channel, value }: ChatCodePreviewProps) => {
  const renderDescendant = (descendant: Descendant) => {
    if ("type" in descendant && descendant.type === "paragraph") {
      let lastTextHaveColor = false;
      return descendant.children.map((item) => {
        if ("type" in item) {
          if (item.type === "icon") {
            return item.icon.code;
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

  return <div className="w-full whitespace-pre-wrap">{result}</div>;
};
