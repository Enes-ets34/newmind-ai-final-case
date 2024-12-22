import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useLoadingStore } from '@/store/loading';
import { useTestTokenMutation } from '@/queries/auth/auth.mutation';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useModalStore } from '@/store/modal';
import Login from '../login-modal/Login';
import useNavigation from '@/utils/handleNavigation';
import { RoutePaths } from '@/types/RoutePaths.enum';
import { useAddressStore } from '@/store/address';
import { useGetAddressByIdQuery } from '@/queries/address/address.query';
import { Address } from '@/queries/address/address.types';
import useClosestAddress from '@/hooks/useClosestAddress';
import { useGetCartQuery } from '@/queries/cart/cart.query';
import { useCartStore } from '@/store/cart';
import { GetCartResponse } from '@/queries/cart/cart.types';

const ProtectedRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();

  const testTokenMutation = useTestTokenMutation();
  const { isPending } = testTokenMutation;
  const addressListQuery = useGetAddressByIdQuery();
  const cartQuery = useGetCartQuery();
  const addressList = addressListQuery?.data;
  const cartData = cartQuery?.data;
  const refetch = cartQuery?.refetch;
  const cartIsError = cartQuery?.isError;
  const isProtected = useProtectedRoute(location?.pathname);
  const { setUser, setAccessToken, user } = useAuthStore();
  const { showLoading, hideLoading } = useLoadingStore();
  const { openModal, setContent } = useModalStore();
  const { setAddressList, setSelectedAddress } = useAddressStore();
  const { setCart, products } = useCartStore();
  useClosestAddress(addressList as Address[], setSelectedAddress);

  useEffect(() => {
    const tokenCheck = async () => {
      const accessToken = localStorage.getItem('access_token');
      const user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : null;

      if (accessToken && user) {
        try {
          await testTokenMutation.mutateAsync();
          setUser(user);
          setAccessToken(accessToken);
        } catch (err) {
          localStorage.removeItem('user');
          localStorage.removeItem('access_token');
          setUser(null);
          setAccessToken(null);
          console.error(err);
          navigation('/' as RoutePaths);
        }
      } else {
        if (isProtected) {
          navigation(RoutePaths.Home);
          openModal();
          setContent(<Login />);
        }
      }
    };
    tokenCheck();
  }, [isProtected, router, setUser, setAccessToken]);

  useEffect(() => {
    if (addressList) {
      setAddressList(addressList as Address[]);
    }
  }, [addressList, setAddressList, setSelectedAddress]);
  useEffect(() => {
    if (user && cartData) {
      setCart(cartData);
    }
  }, [cartData, setCart, user]);

  useEffect(() => {
    if (isPending) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isPending, showLoading, hideLoading]);

  return <div className='container pt-[140px]'>{children}</div>;
};

export default ProtectedRoute;
