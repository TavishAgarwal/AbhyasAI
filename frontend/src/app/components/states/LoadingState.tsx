import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...', 
  fullScreen = false 
}) => {
  const containerClasses = fullScreen 
    ? 'min-h-[60vh] flex flex-col items-center justify-center'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <Loader2 className="w-8 h-8 text-[#4f46e5] animate-spin mb-4" />
      <p className="text-[#718096] font-medium">{message}</p>
    </div>
  );
};
