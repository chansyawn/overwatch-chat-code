import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { IconData } from "../icon-picker/constant";

export type EmptyText = {
  text: "";
};

type IconElement = {
  type: "icon";
  icon: IconData;
  children: EmptyText[];
};

type ParagraphElement = { type: "paragraph"; children: Descendant[] };

type CustomElement = IconElement | ParagraphElement;

type CustomText = {
  text: string;
  color?: string;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
