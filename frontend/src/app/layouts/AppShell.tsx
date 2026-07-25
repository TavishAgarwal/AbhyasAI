import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../components/nav/Navbar';

export function AppShell() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      
    </div>
  );
}
