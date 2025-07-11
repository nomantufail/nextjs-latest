'use server';

import { Product } from '@/app/products/page';

export async function fetchProducts() {
  console.log('here....', 5 + 4);
  try {
    const products = await fetch('https://dummyapi.online/api/products');
    console.log(products);
  } catch (e) {
    // console.log(e)
  }
  return [
    {
      id: 1,
      name: 'MacBook Pro 14"',
      brand: 'Apple',
      description: 'Powerful laptop with M3 chip.',
      basePrice: 1999,
      inStock: true,
      stock: 12,
      featuredImage:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
      thumbnailImage:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
      storageOptions: [
        { size: '512GB', priceModifier: 0 },
        { size: '1TB', priceModifier: 200 },
      ],
      colorOptions: ['grey', 'blue'],
      display: '14.2-inch Liquid Retina XDR',
      CPU: 'Apple M3',
      GPU: 'Integrated 10-core GPU',
      productCategory: 'Laptop',
    },
    {
      id: 2,
      name: 'Galaxy Tab S9',
      brand: 'Samsung',
      description: 'Premium Android tablet with AMOLED display.',
      basePrice: 799,
      inStock: true,
      stock: 5,
      featuredImage:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
      thumbnailImage:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
      storageOptions: [
        { size: '128GB', priceModifier: 0 },
        { size: '256GB', priceModifier: 100 },
      ],
      colorOptions: ['grey', 'blue'],
      display: '11-inch Dynamic AMOLED 2X',
      CPU: 'Snapdragon 8 Gen 2',
      productCategory: 'Tablet',
      camera: {
        rearCamera: '13MP',
        frontCamera: '12MP Ultra-Wide',
      },
    },
    {
      id: 3,
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      description: 'High-end smartphone with A17 Pro chip.',
      basePrice: 999,
      inStock: false,
      stock: 0,
      featuredImage:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
      thumbnailImage:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
      storageOptions: [
        { size: '128GB', priceModifier: 0 },
        { size: '512GB', priceModifier: 300 },
      ],
      colorOptions: ['grey', 'blue'],
      display: '6.1-inch Super Retina XDR',
      CPU: 'Apple A17 Pro',
      GPU: '6-core GPU',
      productCategory: 'Smartphone',
      camera: {
        rearCamera: '48MP Triple Camera',
        frontCamera: '12MP TrueDepth',
      },
    },
  ] as unknown as Product[];
}

export async function fetchProduct(id: string) {
  try {
    const product = await fetch(`https://dummyapi.online/api/products/${id}`, {
      cache: 'force-cache',
    })
    return await product.json() as unknown as Product;
  } catch (e) {

  }
  return {
    id: 2,
    name: 'Galaxy Tab S9',
    brand: 'Samsung',
    description: 'Premium Android tablet with AMOLED display.',
    basePrice: 799,
    inStock: true,
    stock: 5,
    featuredImage: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
    thumbnailImage: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
    storageOptions: ['128GB', '256GB'],
    colorOptions: ['grey', 'blue'],
    display: '11-inch Dynamic AMOLED 2X',
    CPU: 'Snapdragon 8 Gen 2',
    productCategory: 'Tablet',
    camera: {
      rearCamera: '13MP',
      frontCamera: '12MP Ultra-Wide',
    },
  } as unknown as Product;
}
