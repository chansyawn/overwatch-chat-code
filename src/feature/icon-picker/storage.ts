import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ICON_DATA, IconData } from "./constant";

const CUSTOM_ICONS_KEY = "overwatch-chat-custom-icons";

export const customIconsAtom = atomWithStorage<IconData[]>(
  CUSTOM_ICONS_KEY,
  []
);

export const useCustomIcons = () => {
  const [customIcons, setCustomIcons] = useAtom(customIconsAtom);

  const addCustomIcon = (
    newIcon: IconData
  ): { success: boolean; error?: string } => {
    if (
      customIcons.some((existingIcon) => existingIcon.code === newIcon.code) ||
      ICON_DATA.some((existingIcon) => existingIcon.code === newIcon.code)
    ) {
      return {
        success: false,
        error: "This icon code already exists!",
      };
    }

    setCustomIcons((prev) => [...prev, newIcon]);
    return { success: true };
  };

  const removeCustomIcon = (codeToDelete: string) => {
    setCustomIcons((prev) => prev.filter((icon) => icon.code !== codeToDelete));
  };

  return {
    customIcons,
    addCustomIcon,
    removeCustomIcon,
  };
};
