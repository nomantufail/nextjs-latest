import ProductCard from '@/components/product-card/product-card';
import React from 'react';
import { Breadcrumb } from '@/components/bread-crumb/bread-crumb';
import { fetchProducts } from '@/server/fetches';

const COLOR_OPTIONS = {
  Graphite: 'bg-[#2C3539]', // Dark grey with a hint of blue
  Silver: 'bg-[#C0C0C0]', // Light, shiny grey
  Gold: 'bg-[#FFD700]', // Bright metallic gold
  'Pacific Blue': 'bg-[#1CA9C9]', // Bright blue, like tropical waters
  'Space Gray': 'bg-[#666666]', // Mid-tone cool grey
  Black: 'bg-[#000000]', // Pure black
  White: 'bg-[#FFFFFF]', // Pure white
  Burgundy: 'bg-[#800020]', // Deep red with a purple tint
  Green: 'bg-[#008000]', // Standard green, medium shade
  Midnight: 'bg-[#191970]', // Dark blue, close to navy
  Starlight: 'bg-[#F0EAD6]', // Very pale yellow, almost off-white
  'Slate Grey': 'bg-[#708090]', // Grey with a bluish tint
  Orchid: 'bg-[#DA70D6]', // Light purple with a pink hue
  'Graphite Grey': 'bg-[#474A51]', // Darker grey, more intense than Graphite
  'Abyss Blue': 'bg-[#00035B]', // Very deep, dark blue
} as const;
const PRODUCT_CATEGORIES = {
  Smartphone: 'Smartphones',
  Tablet: 'Tablets',
  Laptop: 'Laptops',
} as const;

export type ProductCategory = keyof typeof PRODUCT_CATEGORIES;
export type StorageOption =
  | '128GB'
  | '256GB'
  | '512GB'
  | '64GB'
  | '1TB'
  | '2TB'
  | '4TB'
  | '256GB SSD'
  | '512GB SSD'
  | '1TB SSD';
type Brand = 'Apple' | 'Samsung' | 'Lenovo';
export type ColorOption = keyof typeof COLOR_OPTIONS;

type BaseProduct = {
  id: number;
  name: string;
  brand: Brand;
  description: string;
  basePrice: number;
  inStock: boolean;
  stock: number;
  featuredImage: `https://${string}`;
  thumbnailImage: `https://${string}`;
  storageOptions: StorageOption[];
  colorOptions: ColorOption[];
  display: string;
  CPU: string;
  GPU?: string;
};

export type Product =
  | (BaseProduct & { productCategory: Extract<ProductCategory, 'Laptop'> })
  | (BaseProduct & {
      productCategory: Extract<ProductCategory, 'Tablet' | 'Smartphone'>;
      camera: {
        rearCamera: string;
        frontCamera: string;
      };
    });

export default async function ProductPage() {
  const products = await fetchProducts();
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <Breadcrumb href="/products" label="Products" hasDivider={false} />
        </ol>
      </nav>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
}
