import { error } from '@sveltejs/kit';
import { products } from '$lib/data/products.js';

export function load({ params }) {
  const product = products.find((item) => item.id === params.id);

  if (!product) {
    error(404, 'Product not found');
  }

  return { product };
}