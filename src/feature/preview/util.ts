import { Descendant } from "slate";
import { CHANNEL_COLOR, OverwatchChannel } from "../channel";
import { rgbaToHex } from "../color-palette/color";

export const generateChatCode = (
  value: Descendant[],
  channel: OverwatchChannel
) => {
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

  return result;
};
