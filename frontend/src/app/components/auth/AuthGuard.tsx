import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from './AuthProvider';
import { LoadingState } from '../states/LoadingState';

export function AuthGuard() {
  const { session, loading } = useAuth();

  if (loading) {
    return <LoadingState fullScreen />;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
