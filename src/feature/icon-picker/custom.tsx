import { useState } from "react";
import Image from "next/image";
import type { IconData } from "./constant";
import { SpecialTag } from "./constant";

interface CustomIconAdderProps {
  onAddCustomIcon: (icon: IconData) => void;
}

export const CustomIconAdder = ({ onAddCustomIcon }: CustomIconAdderProps) => {
  const [customCode, setCustomCode] = useState("");
  const [previewError, setPreviewError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCustomIcon = () => {
    if (!customCode.trim()) return;

    const newIcon: IconData = {
      code: customCode.trim(),
      tags: [SpecialTag.Custom],
    };

    onAddCustomIcon(newIcon);
    setCustomCode("");
    setPreviewError(false);
    setIsAdding(false);
  };

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  const handlePreviewLoad = () => {
    setPreviewError(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setCustomCode("");
    setPreviewError(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
        type="button"
      >
        + Add Custom Icon
      </button>
    );
  }

  return (
    <div className="space-y-3 p-3 border border-gray-700/50 rounded-lg bg-gray-800/30">
      <h4 className="text-sm font-medium text-gray-300">Add Custom Icon</h4>

      <div className="space-y-2">
        <label className="block text-xs text-gray-400">
          Icon Code (from{" "}
          <a
            href="https://texture-viewer.overwatchitemtracker.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors underline"
          >
            Overwatch Item Tracker
          </a>
          , you can click image to copy the icon code directly)
        </label>
        <input
          type="text"
          value={customCode}
          onChange={(e) => {
            setCustomCode(e.target.value);
            setPreviewError(false);
          }}
          placeholder="e.g., 000000038C19"
          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {customCode.trim() && (
        <div className="space-y-2">
          <label className="block text-xs text-gray-400">Preview</label>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded border border-gray-600/50 bg-gray-700/30 flex items-center justify-center">
              {previewError ? (
                <span className="text-xs text-red-400">✗</span>
              ) : (
                <Image
                  width={24}
                  height={24}
                  src={`https://assets.overwatchitemtracker.com/textures/${customCode.trim()}.png`}
                  alt={customCode}
                  unoptimized
                  onError={handlePreviewError}
                  onLoad={handlePreviewLoad}
                />
              )}
            </div>
            <span className="text-xs text-gray-400">
              {previewError ? "Icon not found" : "Icon preview"}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleAddCustomIcon}
          disabled={!customCode.trim() || previewError}
          className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
          type="button"
        >
          Add
        </button>
        <button
          onClick={handleCancel}
          className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
