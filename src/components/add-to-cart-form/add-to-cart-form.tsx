'use client';

import React from 'react';
import ColorOptions from '@/components/color-options/color-options';
import StorageOptions from '@/components/storage-options/storage-options';
import { Product } from '@/app/products/page';
import { addToCart } from '../../server/actions';

export default function AddToCartForm({
  id,
  colorOptions,
  storageOptions,
  inStock,
}: Readonly<
  Pick<Product, 'id' | 'colorOptions' | 'storageOptions' | 'inStock'>
>) {
  return (
    <form action={addToCart}>
      {/* Product ID */}
      <input type="hidden" name="id" value={id} />

      {/* Color picker */}
      <div>
        <h2 className="text-sm font-medium text-gray-900">Color</h2>
        <fieldset className="mt-2">
          <legend className="sr-only">Choose a color</legend>
          <div className="flex items-center space-x-3">
            <ColorOptions colorOptions={colorOptions} />
          </div>
        </fieldset>
      </div>

      {/* Size picker */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">Size</h2>
        </div>
        <fieldset className="mt-2">
          <legend className="sr-only">Choose a storage size</legend>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            <StorageOptions storageOptions={storageOptions} />
          </div>
        </fieldset>
      </div>

      <p
        className={`mt-8 text-xs font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}
      >
        {inStock ? 'In stock' : 'Out of stock'}
      </p>

      <button
        type="submit"
        className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to cart
      </button>
    </form>
  );
}
