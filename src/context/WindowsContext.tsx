"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type WindowState = {
  id: string;
  appName: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
};

type WindowsContextType = {
  windows: WindowState[];
  openWindow: (appName: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
};

const WindowsContext = createContext<WindowsContextType | undefined>(undefined);

export const WindowsProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);

  const openWindow = (appName: string) => {
    const newWindow: WindowState = {
      id: `${appName}-${Date.now()}`,
      appName,
      position: { x: 100 + windows.length * 20, y: 100 + windows.length * 20 },
      size: { width: 800, height: 600 },
      zIndex: nextZIndex,
    };
    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const focusWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
    setNextZIndex(nextZIndex + 1);
  };

  return (
    <WindowsContext.Provider value={{ windows, openWindow, closeWindow, focusWindow }}>
      {children}
    </WindowsContext.Provider>
  );
};

export const useWindows = () => {
  const context = useContext(WindowsContext);
  if (!context) {
    throw new Error('useWindows must be used within a WindowsProvider');
  }
  return context;
};
