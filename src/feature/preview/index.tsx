import { Descendant } from "slate";
import { rgbaToHex } from "../editor/color";
import { CHANNEL_COLOR, OverwatchChannel } from "../channel";

type ChatCodePreviewProps = {
  channel: OverwatchChannel;
  value: Descendant[];
};

export const ChatCodePreview = ({ channel, value }: ChatCodePreviewProps) => {
  const content = value[0];

  const renderChatCode = () => {
    if ("type" in content && content.type === "paragraph") {
      let lastTextHaveColor = false;
      return content.children.map((item) => {
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
  };

  return <div className="w-full">{renderChatCode()}</div>;
};
