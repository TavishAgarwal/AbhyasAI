import React from 'react';
import { EmptyState } from '../components/states/EmptyState';

export function NotFoundPage() {
  return (
    <div className="py-20">
      <EmptyState 
        title="Page Not Found"
        message="We couldn't find the page you're looking for."
        actionText="Back to Home"
        actionHref="/"
      />
    </div>
  );
}
