"use client";

import { useState, useRef } from 'react';

const CloudBrowser = () => {
  const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleGo = () => {
    if (iframeRef.current) {
      let finalUrl = url;
      if (!finalUrl.startsWith('http')) {
        finalUrl = 'https://' + finalUrl;
      }
      // This will be updated to use the proxy
      iframeRef.current.src = `/api/proxy?url=${encodeURIComponent(finalUrl)}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGo();
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex items-center p-1 bg-gray-200 border-b border-gray-300">
        <button className="px-2 py-1 mr-1 rounded hover:bg-gray-300">◀</button>
        <button className="px-2 py-1 mr-1 rounded hover:bg-gray-300">▶</button>
        <button onClick={handleRefresh} className="px-2 py-1 mr-1 rounded hover:bg-gray-300">↻</button>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          onKeyDown={handleKeyDown}
          className="flex-grow p-1 rounded border border-gray-400"
        />
      </div>
      <iframe
        ref={iframeRef}
        src={`/api/proxy?url=${encodeURIComponent(url)}`}
        className="flex-grow border-none"
        title="CloudBrowser"
      />
    </div>
  );
};

export default CloudBrowser;
