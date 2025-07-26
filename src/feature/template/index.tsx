import { useTemplates } from "./storage";
import { Descendant } from "slate";
import Image from "next/image";

type TemplateListProps = {
  onApplyTemplate: (content: Descendant[]) => void;
};

export const TemplateList = ({ onApplyTemplate }: TemplateListProps) => {
  const { templates, deleteTemplate } = useTemplates();

  const renderDescendant = (descendant: Descendant) => {
    if ("type" in descendant && descendant.type === "paragraph") {
      return descendant.children.map((item, index) => {
        if ("type" in item) {
          if (item.type === "icon") {
            return (
              <Image
                className="inline-block"
                key={index}
                src={`https://assets.overwatchitemtracker.com/textures/${item.icon.code}.png`}
                alt={item.icon.code}
                width={24}
                height={24}
                unoptimized
              />
            );
          }
          if (item.type === "paragraph") {
            return "";
          }
        }
        return (
          <span key={index} style={{ color: item.color }}>
            {item.text}
          </span>
        );
      });
    }
    return null;
  };

  const handleApplyTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      onApplyTemplate(template.content);
    }
  };

  const handleDeleteTemplate = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTemplate(templateId);
  };

  if (templates.length === 0) {
    return (
      <div className="text-gray-500 text-sm text-center py-4">
        No saved templates
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-300 mb-3">
        Saved Templates
      </h4>
      <div className="space-y-1">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleApplyTemplate(template.id)}
            className="flex items-center justify-between p-2 bg-gray-700/30 border border-gray-600/50 rounded-md hover:bg-gray-600/30 cursor-pointer transition-colors"
          >
            <span className="text-sm text-gray-300 font-mono">
              {template.content.map((item, index) => (
                <p key={index}>{renderDescendant(item)}</p>
              ))}
            </span>
            <button
              onClick={(e) => handleDeleteTemplate(template.id, e)}
              className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-500/20 transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
