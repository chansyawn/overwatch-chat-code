import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const DEFAULT_COLORS = [
  "rgba(255, 255, 255, 1",
  "rgba(0, 195, 255, 1)",
  "rgba(0, 218, 0, 1)",
  "rgba(255, 152, 67, 1)",
  "rgba(244, 130, 255, 1)",
  "linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
  "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)",
  "linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)",
];

const STORAGE_KEY = "color-palette-custom-colors";

const customColorsAtom = atomWithStorage<string[]>(STORAGE_KEY, []);

const allColorsAtom = atom((get) => {
  const customColors = get(customColorsAtom);
  return [...DEFAULT_COLORS, ...customColors];
});

export const usePersistedColors = () => {
  const [, setCustomColors] = useAtom(customColorsAtom);
  const [allColors] = useAtom(allColorsAtom);

  const addColor = (color: string) => {
    setCustomColors((prev) => [...prev, color]);
  };

  const removeColor = (index: number) => {
    if (index >= DEFAULT_COLORS.length) {
      const customIndex = index - DEFAULT_COLORS.length;
      setCustomColors((prev) => prev.filter((_, i) => i !== customIndex));
    }
  };

  return { colors: allColors, addColor, removeColor };
};
