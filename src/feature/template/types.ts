import { Descendant } from "slate";

export type Template = {
  id: string; // 保存时的时间戳
  content: Descendant[];
};
