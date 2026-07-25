import React from 'react';
import { Inbox } from 'lucide-react';
import { Link } from 'react-router';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  actionText?: string;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title,
  message,
  icon,
  actionText,
  actionHref
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center glass-panel w-full max-w-2xl mx-auto">
      <div className="w-20 h-20 bg-indigo-50/50 rounded-2xl flex items-center justify-center mb-6 text-indigo-400">
        {icon || <Inbox className="w-10 h-10" />}
      </div>
      <h3 className="text-xl font-bold text-[#2B3440] mb-2">{title}</h3>
      <p className="text-[#718096] max-w-md mb-8">{message}</p>
      
      {actionHref && actionText && (
        <Link 
          to={actionHref}
          className="primary-btn"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};
