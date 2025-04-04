// components/Loader.jsx
import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex gap-1">
        <div className="w-2 h-8 bg-indigo-500 animate-bounce [animation-delay:-0.3s] rounded"></div>
        <div className="w-2 h-8 bg-indigo-500 animate-bounce [animation-delay:-0.15s] rounded"></div>
        <div className="w-2 h-8 bg-indigo-500 animate-bounce rounded"></div>
      </div>
    </div>
  );
}