"use client";

import React, { useState, useRef, useCallback } from 'react';
import { useWindows } from '@/context/WindowsContext';
import CloudBrowser from './apps/CloudBrowser';

type WindowProps = {
  id: string;
  appName: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
};

const AppContent = ({ appName }: { appName: string }) => {
    switch (appName) {
        case 'CloudBrowser':
            return <CloudBrowser />;
        default:
            return <p className="p-4">Content for {appName} is under construction.</p>;
    }
};

const Window = ({ id, appName, position, zIndex }: WindowProps) => {
  const { closeWindow, focusWindow } = useWindows();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(position);

  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Bring window to front
    focusWindow(id);

    // Check if the mousedown event is on the header
    const header = e.currentTarget.querySelector('.window-header');
    if (header && header.contains(e.target as Node)) {
      setIsDragging(true);
      const windowRect = windowRef.current?.getBoundingClientRect();
      if (windowRect) {
        setDragOffset({
          x: e.clientX - windowRect.left,
          y: e.clientY - windowRect.top,
        });
      }
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setCurrentPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  }, [isDragging, dragOffset.x, dragOffset.y]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add and remove global listeners for mouse move and up
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={windowRef}
      className="absolute bg-gray-200 border border-gray-400 rounded-lg shadow-lg flex flex-col overflow-hidden"
      style={{
        top: `${currentPosition.y}px`,
        left: `${currentPosition.x}px`,
        width: '800px', // Static for now
        height: '600px', // Static for now
        zIndex: zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="window-header h-8 bg-gray-300 flex items-center justify-between px-2 cursor-move">
        <span className="font-bold text-sm">{appName}</span>
        <div className="flex items-center">
          <button onClick={() => closeWindow(id)} className="w-5 h-5 bg-red-500 rounded-full hover:bg-red-600"></button>
        </div>
      </div>
      <div className="flex-grow bg-white">
        <AppContent appName={appName} />
      </div>
    </div>
  );
};

export default Window;
