// app\(user)\home\shop\[product_id]

import React from 'react';

import ProductDetailsPage from './product-card-details';

const fetchProductData = async (product_id: string) => {
  const res = await fetch(`${process.env.URL}/api/product?id=${product_id}`);
  const data = await res.json();

  return data;
};

export async function generateMetadata({
  params,
}: {
  params: { product_id: string };
}) {
  const product = await fetchProductData(params.product_id);

  return {
    title: `${product.name} - ${product.description}`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { product_id: string };
}) {
  const product = await fetchProductData(params.product_id);

  return <ProductDetailsPage product={product} />;
}
