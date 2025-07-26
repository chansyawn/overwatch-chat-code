import { useState, useEffect } from "react";

// 默认颜色调色板
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

// 存储键名
const STORAGE_KEY = "color-palette-custom-colors";

// 自定义hook用于管理颜色的持久化存储
export const usePersistedColors = () => {
  const [colors, setColors] = useState<string[]>(DEFAULT_COLORS);

  // 从localStorage加载颜色
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedColors = localStorage.getItem(STORAGE_KEY);
        if (savedColors) {
          const customColors = JSON.parse(savedColors);
          // 合并默认颜色和用户自定义颜色
          setColors([...DEFAULT_COLORS, ...customColors]);
        }
      } catch (error) {
        console.error("Error loading colors from localStorage:", error);
      }
    }
  }, []);

  // 保存颜色到localStorage
  const saveColors = (newColors: string[]) => {
    if (typeof window !== "undefined") {
      try {
        // 只保存用户自定义的颜色（默认颜色之外的）
        const customColors = newColors.slice(DEFAULT_COLORS.length);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customColors));
      } catch (error) {
        console.error("Error saving colors to localStorage:", error);
      }
    }
  };

  // 添加颜色
  const addColor = (color: string) => {
    const newColors = [...colors, color];
    setColors(newColors);
    saveColors(newColors);
  };

  // 删除颜色（只能删除用户自定义的颜色）
  const removeColor = (index: number) => {
    if (index >= DEFAULT_COLORS.length) {
      const newColors = colors.filter((_, i) => i !== index);
      setColors(newColors);
      saveColors(newColors);
    }
  };

  return { colors, addColor, removeColor };
};
