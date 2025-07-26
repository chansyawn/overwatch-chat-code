import type { IconData } from "./constant";

const CUSTOM_ICONS_KEY = "overwatch-chat-custom-icons";

export const getCustomIcons = (): IconData[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(CUSTOM_ICONS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveCustomIcons = (icons: IconData[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CUSTOM_ICONS_KEY, JSON.stringify(icons));
  } catch (error) {
    console.error("Failed to save custom icons:", error);
  }
};

export const addCustomIcon = (
  currentIcons: IconData[],
  newIcon: IconData
): { success: boolean; icons: IconData[]; error?: string } => {
  // 检查是否已存在相同的code
  if (currentIcons.some((existingIcon) => existingIcon.code === newIcon.code)) {
    return {
      success: false,
      icons: currentIcons,
      error: "This icon code already exists!",
    };
  }

  const updatedIcons = [...currentIcons, newIcon];
  saveCustomIcons(updatedIcons);
  
  return {
    success: true,
    icons: updatedIcons,
  };
};

export const removeCustomIcon = (
  currentIcons: IconData[],
  codeToDelete: string
): IconData[] => {
  const updatedIcons = currentIcons.filter(
    (icon) => icon.code !== codeToDelete
  );
  saveCustomIcons(updatedIcons);
  return updatedIcons;
}; 