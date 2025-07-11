'use client';

import { ColorOption } from '@/app/products/page';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { COLOR_OPTIONS } from '@/constants';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const isColorOption = (
  maybeColorOption: string
): maybeColorOption is ColorOption =>
  Object.keys(COLOR_OPTIONS).includes(maybeColorOption);

export default function ColorOptions({
  colorOptions,
}: Readonly<{ colorOptions: ColorOption[] }>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const [selectedColorOption, setSelectedColorOption] = useState<
    ColorOption | ''
  >('');
  useEffect(() => {
    const maybeColorOption = searchParams.get('color') ?? '';
    const colorOption = isColorOption(maybeColorOption) ? maybeColorOption : '';
    setSelectedColorOption(colorOption);
  }, [searchParams]);

  return (
    <>
      {colorOptions.map((colorOption) => (
        <Fragment key={colorOption}>
          <label
            className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-900 ${selectedColorOption === colorOption ? 'ring-2 ring-gray-400 ring-offset-1' : ''}`.trimEnd()}
          >
            <input
              required={true}
              type="radio"
              name="color"
              defaultValue={colorOption}
              className="sr-only"
              aria-labelledby={`color-choice-${colorOption}-label`}
              checked={selectedColorOption === colorOption}
              onChange={() => {
                void router.replace(
                  `${pathname}?${createQueryString('color', colorOption)}`,
                  {
                    scroll: false,
                  }
                );
              }}
            />
            <span id={`color-choice-${colorOption}-label`} className="sr-only">
              {colorOption}
            </span>
            <span
              aria-hidden="true"
              className={`h-8 w-8 rounded-full border border-black border-opacity-10 ${COLOR_OPTIONS[colorOption]}`}
            />
          </label>
        </Fragment>
      ))}
    </>
  );
}
