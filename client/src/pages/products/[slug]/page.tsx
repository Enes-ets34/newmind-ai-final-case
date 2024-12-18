import { Product } from '@/queries/products/product.types';
import { useGetSingleProductQuery } from '@/queries/products/product.query';
import ProductDetailView from '@/views/product-detail/ProductDetailView';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLoadingStore } from '@/store/loading';

export default function ProductDetailScreen() {
  const { slug } = useParams();
  const { showLoading, hideLoading } = useLoadingStore();

  const { data: product, isLoading } = useGetSingleProductQuery(slug as string);

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading]);

  if (!product?.data) return <>Ürün bulunamadı</>;

  return <ProductDetailView product={product?.data as Product} />;
}
