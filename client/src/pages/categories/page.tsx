import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useCampaignsQuery } from '@/queries/campaigns/campaign.query';
import { useCategoriesQuery } from '@/queries/categories/category.query';
import { useFilterProductsQuery } from '@/queries/products/product.query';

import { SubCategoryProducts } from '@/store/product/productStore.types';
import { Category } from '@/queries/categories/category.types';

import { useAuthStore } from '@/store/auth';
import { useCampaignStore } from '@/store/campaigns';
import { useProductStore } from '@/store/product';
import { useCategoryStore } from '@/store/categories';
import { useLoadingStore } from '@/store/loading';
import { useCartStore } from '@/store/cart';

import CategoriesView from '@/views/categories/CategoriesView';
import { GetCartResponse } from '@/queries/cart/cart.types';
import { useGetCartQuery } from '@/queries/cart/cart.query';

export default function CategoriesScreen() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const key = queryParams?.get('key');
  const [openCategory, setOpenCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );

  const { setCampaigns, campaigns } = useCampaignStore();
  const { setCategories, categories } = useCategoryStore();
  const { setProducts, products } = useProductStore();
  const { showLoading, hideLoading } = useLoadingStore();
  const { totalPrice, setCart } = useCartStore();
  const cartProducts = useCartStore(state => state.products);

  const { user } = useAuthStore();

  const {
    data: campaignsQueryData,
    isSuccess: campaignQueryIsSuccess,
    isError: campaignQueryIsError,
    isLoading: campaignQueryIsLoading,
  } = useCampaignsQuery();

  const {
    data: cartQueryData,
    isError: cartQueryIsError,
    isSuccess: cartQueryIsSuccess,
    isLoading: cartIsLoading,
    refetch: cartQueryRefetch,
  } = useGetCartQuery();
  const {
    data: productsQueryData,
    isSuccess: productQueryIsSuccess,
    isLoading: productIsLoading,
    refetch: productQueryRefetch,
  } = useFilterProductsQuery(openCategory?._id as string);

  const {
    data: categoriesQueryData,
    isSuccess: categoryQueryIsSuccess,
    isLoading: categoryIsLoading,
  } = useCategoriesQuery();
  useEffect(() => {
    if (openCategory?.subCategories && setSelectedSubCategory) {
      setSelectedSubCategory(openCategory?.subCategories[0]?._id || null);
      productQueryRefetch();
      if (Array.isArray(productsQueryData?.data)) {
        setProducts(productsQueryData?.data);
      }
    }
  }, [openCategory, setSelectedSubCategory, key]);

  useEffect(() => {
    if (key && categories) {
      if (key) {
        setOpenCategory(
          categories?.find(
            (category: Category) => category?.slug === key
          ) as Category
        );
      }
      setSelectedSubCategory(
        categories?.find((category: Category) => category?.slug === key)
          ?.subCategories?.[0]?._id || null
      );
    } else {
      setOpenCategory(categories[0]);
    }
  }, [key, categories]);

  useEffect(() => {
    if (campaignsQueryData) {
      setCampaigns(campaignsQueryData?.data);
    }
  }, [campaignsQueryData, setCampaigns]);

  useEffect(() => {
    if (campaignQueryIsSuccess) {
      setCampaigns(campaignsQueryData.data);
    }
    if (categoryQueryIsSuccess) {
      setCategories(categoriesQueryData.data);
    }
    if (productQueryIsSuccess && Array.isArray(productsQueryData?.data)) {
      setProducts(productsQueryData.data);
    }
  }, [
    campaignQueryIsSuccess,
    campaignQueryIsError,
    categoryQueryIsSuccess,
    productQueryIsSuccess,
    user,
    campaignsQueryData,
    categoriesQueryData,
    productsQueryData,
    setCampaigns,
    setCategories,
    setProducts,
  ]);

  useEffect(() => {
    if (
      (user && campaignQueryIsLoading) ||
      productIsLoading ||
      categoryIsLoading
    ) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [categoryIsLoading, campaignQueryIsLoading, productIsLoading]);

  return (
    <CategoriesView
      campaigns={campaigns}
      categories={categories}
      products={(products as SubCategoryProducts[]) || []}
      categoryIsLoading={categoryIsLoading}
      openCategory={openCategory as Category}
      selectedSubCategory={(selectedSubCategory as string) || ''}
      setOpenCategory={setOpenCategory}
      setSelectedSubCategory={setSelectedSubCategory}
      cartProducts={cartProducts}
      totalPrice={totalPrice}
    />
  );
}
