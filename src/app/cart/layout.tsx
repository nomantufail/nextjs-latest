import React from 'react';
import UnderConstructionIcon from '../../components/under-construction-icon/under-construction-icon';
import Link from 'next/link';

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-[100svh] w-full flex-col items-center justify-center gap-8 p-8">
      <UnderConstructionIcon className="h-72 w-72 flex-shrink-0" />
      <h1 className="text-3xl">Cart Page</h1>

      {children}

      <Link
        href="/products"
        className="mt-2 flex w-fit w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Back to Products Page
      </Link>
    </main>
  );
}
