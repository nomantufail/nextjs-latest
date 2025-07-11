'use server';

import { redirect } from 'next/navigation';
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';
import { COOKIE_CART_NAME } from '@/constants';

const cartItemFields = [
  'id',
  'color',
  'storage',
] as const satisfies (keyof CartItem)[];
type CartItem = { id: string; color: string; storage: string };
type Cart = CartItem[];

const isCart = (maybeCart: unknown): maybeCart is Cart =>
  Array.isArray(maybeCart) &&
  maybeCart.every((cartItem) =>
    cartItemFields.every((key) => Object.keys(cartItem).includes(key))
  ) &&
  maybeCart.every((cartItem) =>
    Object.values(cartItem).every((value) => typeof value === 'string')
  );

export async function addToCart(formData: FormData) {
  const oneDay = 24 * 60 * 60 * 1000;

  const newCartItem = Object.fromEntries(
    Array.from(formData.entries())
      .filter(([key]) => (cartItemFields as string[]).includes(key))
      .map(([key, value]) => [key, value.toString()])
  );

  const cart = (() => {
    try {
      const maybeCart = JSON.parse(
        (cookies() as unknown as UnsafeUnwrappedCookies).get(COOKIE_CART_NAME)?.value ?? ''
      );

      if (!isCart(maybeCart)) throw Error('Cart is invalid');

      return maybeCart;
    } catch (error) {
      console.info(error);

      return [] satisfies Cart;
    }
  })();

  (await cookies()).set(COOKIE_CART_NAME, JSON.stringify([...cart, newCartItem]), {
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
    path: '/',
    expires: Date.now() + oneDay,
  });

  redirect('/cart');
}
