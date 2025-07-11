import React from 'react';
import Image from 'next/image';
import { Product } from '@/app/products/page';
import Link from 'next/link';

export default function ProductCard({
  id,
  name,
  basePrice,
  colorOptions,
  description,
  productCategory,
  thumbnailImage,
}: Readonly<Product>) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-h-4 aspect-w-3 sm:aspect-none bg-gray-200 group-hover:opacity-75 sm:h-96">
        <Image
          src={thumbnailImage}
          width={800}
          height={600}
          alt={description}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/products/${productCategory.toLowerCase()}/${id}`}>
            <span aria-hidden="true" className="absolute inset-0"></span>
            {name}
          </Link>
        </h3>
        <p className="text-xs text-gray-500">{description}</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-sm italic text-gray-500">
            {colorOptions.join(', ')}
          </p>
          <p className="text-base font-medium text-gray-900">${basePrice}</p>
        </div>
      </div>
    </div>
  );
}
