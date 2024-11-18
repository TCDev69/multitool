import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  gradient: string;
}
 
export function PageHeader({ title, description, gradient }: PageHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className={`text-4xl font-bold mb-2 bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}>
        {title}
      </h1>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}