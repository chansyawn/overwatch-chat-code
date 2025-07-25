import clsx from "clsx";

export enum OverwatchChannel {
  All = "All",
  Team = "Team",
  Group = "Group",
  Match = "Match",
  Whisper = "Whisper",
}

type ChannelPickerProps = {
  value: OverwatchChannel;
  onChange: (value: OverwatchChannel) => void;
};

export const CHANNEL_COLOR = {
  [OverwatchChannel.All]: "rgba(255, 255, 255, 1)",
  [OverwatchChannel.Team]: "rgba(0, 195, 255, 1)",
  [OverwatchChannel.Group]: "rgba(0, 218, 0, 1)",
  [OverwatchChannel.Match]: "rgba(255, 152, 67, 1)",
  [OverwatchChannel.Whisper]: "rgba(244, 130, 255, 1)",
};

export const ChannelPicker = ({ value, onChange }: ChannelPickerProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-400">Channel:</span>
      <div className="flex gap-1 p-1 bg-gray-800/50 rounded-lg border border-gray-700/50">
        {Object.values(OverwatchChannel).map((channel) => (
          <button
            key={channel}
            onClick={() => onChange(channel)}
            className={clsx(
              "px-3 py-1 rounded-md text-sm font-medium transition-all duration-200",
              value === channel
                ? "bg-gray-700 shadow-sm"
                : "hover:bg-gray-700/50"
            )}
            style={{ color: CHANNEL_COLOR[channel] }}
          >
            {channel}
          </button>
        ))}
      </div>
    </div>
  );
};
