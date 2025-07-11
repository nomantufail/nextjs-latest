'use client';

import { StorageOption } from '@/app/products/page';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { STORAGE_OPTIONS } from '@/constants';

const isStorageOption = (
  maybeStorageOption: string
): maybeStorageOption is StorageOption =>
  (STORAGE_OPTIONS as string[]).includes(maybeStorageOption);

export default function StorageOptions({
  storageOptions,
}: Readonly<{ storageOptions: StorageOption[] }>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedStorageOption, setSelectedStorageOption] = useState<
    StorageOption | ''
  >('');
  useEffect(() => {
    const maybeStorageOption = searchParams.get('storage') ?? '';
    const storageOption = isStorageOption(maybeStorageOption)
      ? maybeStorageOption
      : '';
    setSelectedStorageOption(storageOption);
  }, [searchParams]);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      {storageOptions.map((storageOption) => (
        <Fragment key={storageOption}>
          {/*
            In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
            Active: "ring-2 ring-indigo-500 ring-offset-2"
            Checked: "border-transparent bg-indigo-600 text-white hover:bg-indigo-700", Not Checked: "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
          */}
          <label
            className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase focus:outline-none sm:flex-1 ${selectedStorageOption === storageOption ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700' : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'}`.trimEnd()}
          >
            <input
              required={true}
              type="radio"
              name="storage"
              defaultValue={storageOption}
              className="sr-only"
              aria-labelledby={`storage-choice-${storageOption}-label`}
              checked={selectedStorageOption === storageOption}
              onChange={() => {
                void router.replace(
                  `${pathname}?${createQueryString('storage', storageOption)}`,
                  {
                    scroll: false,
                  }
                );
              }}
            />
            <span id="storage-choice-0-label">{storageOption}</span>
          </label>
        </Fragment>
      ))}
    </>
  );
}
