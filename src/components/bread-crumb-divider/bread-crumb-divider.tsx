import React from 'react';

export function BreadCrumbDivider({
  className,
}: Readonly<{ className: string }>) {
  return (
    <svg viewBox="0 0 6 20" aria-hidden="true" className={className}>
      <path
        d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
        fill="currentColor"
      />
    </svg>
  );
}
