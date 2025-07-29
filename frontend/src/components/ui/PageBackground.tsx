
import React from 'react';

export const PageBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen relative bg-black">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0 opacity-50"
        style={{ 
          backgroundImage: "url('/hulk.jpg')", 
          backgroundBlendMode: "overlay" 
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 z-0" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};
