import React from 'react';
import { ProductCategory } from '@/app/products/page';
import { PRODUCT_CATEGORIES } from '@/constants';
import { Breadcrumb } from '@/components/bread-crumb/bread-crumb';
import { toTitleCase } from '@/utils';
import { fetchProduct } from '@/server/fetches';

type Params = Promise<{ id: string; category: string }>
const isProductCategory = (
  maybeProductCategory: string
): maybeProductCategory is ProductCategory =>
  Object.keys(PRODUCT_CATEGORIES).includes(maybeProductCategory);

// REF: https://nextjs.org/docs/app/api-reference/file-conventions/page
export default async function ProductPageLayout(
  props: Readonly<{
    params: Params;
    children: React.ReactNode;
  }>
) {
  const params = await props.params;

  const {
    children
  } = props;

  const maybeProductName = params.id
    ? await fetchProduct(params.id).then((product) => product.name)
    : '';
  const titleCaseProductCategory = toTitleCase(params.category);

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <Breadcrumb href="/products" label="Products" hasDivider={true} />

          {params.category && isProductCategory(titleCaseProductCategory) && (
            <Breadcrumb
              href=""
              label={PRODUCT_CATEGORIES[titleCaseProductCategory]}
              hasDivider={true}
            />
          )}

          {maybeProductName && (
            <Breadcrumb
              href={`/products/${params.category}/${params.id}`}
              label={maybeProductName}
              hasDivider={false}
            />
          )}
        </ol>
      </nav>

      {children}
    </>
  );
}
