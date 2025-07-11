import { cookies } from 'next/headers';
import { COOKIE_CART_NAME } from '@/constants';

export default async function CartPage() {
  const cart = JSON.stringify(
    JSON.parse((await cookies()).get(COOKIE_CART_NAME)?.value ?? '[]'),
    null,
    4
  );

  return <pre>{cart}</pre>;
}
