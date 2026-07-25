import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  actionText?: string;
  actionHref?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = 'Something went wrong',
  message = 'We encountered an unexpected error. Please try again.',
  onRetry,
  actionText,
  actionHref
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-[#2B3440] mb-2">{title}</h3>
      <p className="text-[#718096] max-w-md mb-8">{message}</p>
      
      <div className="flex gap-4">
        {onRetry && (
          <button 
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-[#E2E8F0] rounded-xl font-medium text-[#4A5568] hover:bg-slate-50 transition-colors shadow-sm"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
        )}
        
        {actionHref && actionText && (
          <Link 
            to={actionHref}
            className="px-6 py-2.5 bg-[#4f46e5] text-white rounded-xl font-medium hover:bg-[#4338ca] transition-colors shadow-sm"
          >
            {actionText}
          </Link>
        )}
      </div>
    </div>
  );
};
