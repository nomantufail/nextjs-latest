import '@/stylesheets/globals.css';
import React from 'react';

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {children}
    </div>
  );
}
