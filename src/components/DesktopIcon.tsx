"use client";

import { useWindows } from "@/context/WindowsContext";

type DesktopIconProps = {
  appName: string;
};

const DesktopIcon = ({ appName }: DesktopIconProps) => {
  const { openWindow } = useWindows();

  const handleDoubleClick = () => {
    openWindow(appName);
  };

  return (
    <div
      className="w-24 h-24 flex flex-col items-center justify-center text-white cursor-pointer rounded-lg hover:bg-white/20 p-2"
      onDoubleClick={handleDoubleClick}
    >
      {/* Placeholder for actual icon image */}
      <div className="w-12 h-12 bg-gray-400 rounded-lg mb-2"></div>
      <span className="text-sm text-center truncate">{appName}</span>
    </div>
  );
};

export default DesktopIcon;
