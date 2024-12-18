import { useMutation } from '@tanstack/react-query';
import httpRequest from '@api/httpRequest';
import {
  LoginRequest,
  AuthResponse,
  RegisterRequest,
  AuthErrorResponse,
  TestTokenResponse,
} from './auth.types';
import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toast';
import { ToastEnum } from '@/components/toast/toast.types';
import { useModalStore } from '@/store/modal';
import { useLoadingStore } from '@/store/loading';
import { useNavigate } from 'react-router-dom';
import { User } from '../users/user.types';
import { useGetCartQuery } from '../cart/cart.query';
import { useCartStore } from '@/store/cart';

export const useRegisterMutation = () => {
  const { setUser, setAccessToken } = useAuthStore();
  const { addToast } = useToastStore();
  const { closeModal } = useModalStore();
  const { hideLoading } = useLoadingStore();
  return useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: async (registerData: RegisterRequest) => {
      const response = await httpRequest.post<AuthResponse>(
        '/auth/register',
        registerData
      );
      return response.data;
    },
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user as User);
      setAccessToken(data.access_token as string);
      addToast('Kayıt başarılı!', ToastEnum.SUCCESS);
      closeModal();
      hideLoading();
    },
    onError: (error: Error) => {
      const authError = error as AuthErrorResponse;

      console.error('Register failed:', error);
      const messages = authError?.messages;
      if (messages && Array.isArray(messages)) {
        messages.forEach((message: string) => {
          addToast(message, ToastEnum.ERROR);
        });
        hideLoading();
      } else {
        addToast('Beklenmedik bir hata oluştu.', ToastEnum.ERROR);
        hideLoading();
      }
    },
  });
};
export const useLoginMutation = () => {
  const { refetch: refetchCart } = useGetCartQuery();

  const { setUser, setAccessToken } = useAuthStore();
  const { addToast } = useToastStore();
  const { closeModal } = useModalStore();
  const { hideLoading } = useLoadingStore();
  const { setCart } = useCartStore();

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: async (loginData: LoginRequest) => {
      const response = await httpRequest.post<AuthResponse>(
        '/auth/login',
        loginData
      );
      return response.data;
    },
    onSuccess: async (data: AuthResponse) => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user as User);
      setAccessToken(data.access_token as string);
      closeModal();
      hideLoading();

      const cartResponse = await refetchCart();
      if (cartResponse.data) {
        setCart(cartResponse.data);
      }
    },
    onError: (error: Error) => {
      const authError = error as AuthErrorResponse;
      console.error('Login failed:', error);

      const messages = authError?.messages;
      if (messages && Array.isArray(messages)) {
        messages.forEach((message: string) => {
          addToast(message, ToastEnum.ERROR);
        });
        hideLoading();
      } else {
        addToast('An unexpected error occurred.', ToastEnum.ERROR);
        hideLoading();
      }
    },
  });
};

export const useTestTokenMutation = () => {
  const { setUser, setAccessToken } = useAuthStore();
  const { addToast } = useToastStore();
  const { hideLoading } = useLoadingStore();
  const { setCart } = useCartStore();
  const { data: cartData, isSuccess } = useGetCartQuery();

  return useMutation<TestTokenResponse, AuthErrorResponse>({
    mutationFn: async () => {
      const response = await httpRequest.get<TestTokenResponse>('/auth/test');
      return response.data;
    },
    onSuccess: async (data: TestTokenResponse) => {
      addToast(data?.message as string, ToastEnum.SUCCESS);

      if (cartData && isSuccess) {
        setCart(cartData);
      }
      hideLoading();
    },
    onError: (error: Error) => {
      const authError = error as AuthErrorResponse;
      const messages = authError?.messages;
      if (messages && Array.isArray(messages)) {
        messages.forEach((message: string) => {
          addToast(message, ToastEnum.ERROR);
        });
      } else {
        addToast('Beklenmedik bir hata oluştu.', ToastEnum.ERROR);
      }

      setUser(null);
      setAccessToken(null);
      localStorage?.removeItem('user');
      localStorage?.removeItem('access_token');

      hideLoading();
    },
  });
};
export const useLogoutMutation = () => {
  const { setUser, setAccessToken } = useAuthStore();
  const { addToast } = useToastStore();
  const { closeModal } = useModalStore();
  const { hideLoading } = useLoadingStore();
  const navigate = useNavigate();

  return useMutation<AuthResponse, AuthErrorResponse>({
    mutationFn: async () => {
      const response = await httpRequest.get<AuthResponse>('/auth/logout');
      return response.data;
    },
    onSuccess: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      setUser(null);
      setAccessToken(null);
      addToast('Çıkış Başarılı!', ToastEnum.SUCCESS);
      closeModal();
      navigate('/');
      hideLoading();
    },
    onError: (error: Error) => {
      const authError = error as AuthErrorResponse;
      console.error('Logout failed:', error);
      const messages = authError?.messages;
      if (messages && Array.isArray(messages)) {
        messages.forEach((message: string) => {
          addToast(message, ToastEnum.ERROR);
        });
      } else {
        addToast('Beklenmedik bir hata oluştu.', ToastEnum.ERROR);
      }
      hideLoading();
    },
  });
};
