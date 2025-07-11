import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from '@/components/star/star';
import AddToCartForm from '@/components/add-to-cart-form/add-to-cart-form';
import { fetchProduct } from '@/server/fetches';

export default async function ProductPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const product = await fetchProduct(params.id);

  return (
    <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
      <div className="lg:col-span-5 lg:col-start-8">
        <p className="text-xs font-medium text-gray-500">{product.brand}</p>
        <div className="flex justify-between">
          <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>
          <p className="text-xl font-medium text-gray-900">
            ${product.basePrice}
          </p>
        </div>
        {/* Reviews */}
        <div className="mt-4">
          <h2 className="sr-only">Reviews</h2>
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              3.9
              <span className="sr-only"> out of 5 stars</span>
            </p>
            <div className="ml-1 flex items-center">
              {[true, true, true, true, false].map((active, index) => (
                <Star key={`star-${index}`} active={active} />
              ))}
            </div>
            <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
              ·
            </div>
            <div className="ml-4 flex">
              <Link
                href="#"
                className="pointer-events-none select-none text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                See all 512 reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Image gallery */}
      <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
        <h2 className="sr-only">Images</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
          <Image
            priority={true}
            height={800}
            width={600}
            src={product.featuredImage}
            alt={product.name}
            className="w-full rounded-lg lg:col-span-2 lg:row-span-2"
          />
          <Image
            height={400}
            width={300}
            src={product.thumbnailImage}
            alt={product.name}
            className="hidden  w-full rounded-lg lg:block"
          />
          <Image
            height={400}
            width={300}
            src={product.thumbnailImage}
            alt={product.name}
            className="hidden w-full rounded-lg lg:block"
          />
        </div>
      </div>
      <div className="mt-8 lg:col-span-5">
        <AddToCartForm
          id={product.id}
          colorOptions={product.colorOptions}
          storageOptions={product.storageOptions}
          inStock={product.inStock}
        />
        {/* Product details */}
        <div className="mt-10">
          <h2 className="text-sm font-medium text-gray-900">Description</h2>
          <div className="prose prose-sm mt-4 text-gray-500">
            <p>{product.description}</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="text-sm font-medium text-gray-900">CPU</h2>
          <div className="prose prose-sm mt-4 text-gray-500">
            <p>{product.CPU}</p>
          </div>
        </div>
        {product.GPU && (
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-sm font-medium text-gray-900">GPU</h2>
            <div className="prose prose-sm mt-4 text-gray-500">
              <p>{product.GPU}</p>
            </div>
          </div>
        )}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="text-sm font-medium text-gray-900">Display</h2>
          <div className="prose prose-sm mt-4 text-gray-500">
            <p>{product.display}</p>
          </div>
        </div>
        {product.productCategory === 'Smartphone' ||
          (product.productCategory === 'Tablet' && (
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">Camera</h2>
              <div className="prose prose-sm mt-4 text-gray-500">
                <p>{product.camera.frontCamera}</p>
              </div>
              <div className="prose prose-sm mt-4 text-gray-500">
                <p>{product.camera.rearCamera}</p>
              </div>
            </div>
          ))}
        {/* Policies */}
        <section aria-labelledby="policies-heading" className="mt-10">
          <h2 id="policies-heading" className="sr-only">
            Our Policies
          </h2>
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
              <dt>
                <svg
                  className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                  />
                </svg>
                <span className="mt-4 text-sm font-medium text-gray-900">
                  International delivery
                </span>
              </dt>
              <dd className="mt-1 text-sm text-gray-500">
                Get your order in 3 days
              </dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
              <dt>
                <svg
                  className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="mt-4 text-sm font-medium text-gray-900">
                  Loyalty rewards
                </span>
              </dt>
              <dd className="mt-1 text-sm text-gray-500">
                Earn discount codes
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
