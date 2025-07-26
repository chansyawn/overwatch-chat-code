import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { Template } from "./types";

// 创建持久化存储的原子
const templatesAtom = atomWithStorage<Template[]>("chat-templates", []);

// 自定义hook来管理模板
export const useTemplates = () => {
  const [templates, setTemplates] = useAtom(templatesAtom);

  const saveTemplate = (content: Template["content"]) => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      content,
    };
    setTemplates((prev) => [...prev, newTemplate]);
    return newTemplate;
  };

  const deleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((template) => template.id !== id));
  };

  const getTemplate = (id: string) => {
    return templates.find((template) => template.id === id);
  };

  return {
    templates,
    saveTemplate,
    deleteTemplate,
    getTemplate,
  };
};
