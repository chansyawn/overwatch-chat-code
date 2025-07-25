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
    <div className="flex gap-2">
      {Object.values(OverwatchChannel).map((channel) => (
        <button
          key={channel}
          onClick={() => onChange(channel)}
          className={clsx(
            "cursor-pointer border border-white/10 px-3 py-1 rounded-lg hover:bg-amber-300/20 transition-all duration-300 items-center",
            value === channel ? "bg-amber-300/20" : "bg-slate-700/40"
          )}
          style={{ color: CHANNEL_COLOR[channel] }}
        >
          {channel}
        </button>
      ))}
    </div>
  );
};
