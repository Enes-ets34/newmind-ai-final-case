import { useMutation } from '@tanstack/react-query';
import httpRequest from '@api/httpRequest';
import { CreatePaymentRequest, PaymentResponse } from './payment.types';
import { useToastStore } from '@/store/toast';
import { ToastEnum } from '@/components/toast/toast.types';
import { useCartStore } from '@/store/cart';
import { GetCartResponse } from '../cart/cart.types';

export const useCreatePaymentMutation = () => {
  const { addToast } = useToastStore();
  const { setCart, products } = useCartStore();
  return useMutation<PaymentResponse, Error, CreatePaymentRequest>({
    mutationFn: async () => {
      const response = await httpRequest.post<PaymentResponse>('/payments');
      return response.data;
    },
    onSuccess: () => {
      addToast('Siparişiniz başarıyla oluşturuldu...', ToastEnum.SUCCESS);
      setCart({} as GetCartResponse);
      setTimeout(() => {
        location.replace("/")
      }, 1000);
    },
    onError: (error: Error) => {
      console.error('Payment failed:', error);
      setCart({} as GetCartResponse);
      addToast('Siparişiniz oluşturulamadı...', ToastEnum.ERROR);
    },
  });
};
