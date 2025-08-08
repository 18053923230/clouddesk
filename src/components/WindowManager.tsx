"use client";

import { useWindows } from "@/context/WindowsContext";
import Window from "./Window";

const WindowManager = () => {
  const { windows } = useWindows();

  return (
    <>
      {windows.map(window => (
        <Window key={window.id} {...window} />
      ))}
    </>
  );
};

export default WindowManager;
