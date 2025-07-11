import React, { ReactNode } from 'react';
import { BreadCrumbDivider } from '@/components/bread-crumb-divider/bread-crumb-divider';
import Link from 'next/link';

export function Breadcrumb({
  label,
  href,
  hasDivider,
}: Readonly<{
  label: ReactNode;
  href: HTMLAnchorElement['href'];
  hasDivider: boolean;
}>) {
  return (
    <li>
      <div className="flex items-center">
        <Link
          href={href}
          className={`mr-4 select-none text-sm font-medium text-gray-900 ${href ? 'pointer-events-auto' : 'pointer-events-none'}`.trimEnd()}
        >
          {label}
        </Link>
        {hasDivider && (
          <BreadCrumbDivider className="h-5 w-auto text-gray-300" />
        )}
      </div>
    </li>
  );
}
