import React from 'react';

interface CardProps {
  children: React.ReactNode;
}
 
export function Card({ children }: CardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur rounded-lg p-6 shadow-xl border border-gray-700/50">
      {children}
    </div>
  );
}