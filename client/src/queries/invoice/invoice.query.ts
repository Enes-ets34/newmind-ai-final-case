import { useQuery } from '@tanstack/react-query';
import httpRequest from '@api/httpRequest';
import { GetInvoiceResponse } from './invoice.types';

export const useGetInvoices = () => {
  return useQuery<GetInvoiceResponse['data'], Error>({
    queryKey: ['invoice'],
    queryFn: async () => {
      const response = await httpRequest.get<GetInvoiceResponse>(`/invoices/get-invoices`);
      return response.data.data; // Burada sadece data döndürüyoruz
    },
    staleTime: 300000, // 5 dakika
    refetchOnWindowFocus: false, // Pencere odağı değiştiğinde yeniden sorgu yapılmaz
  });
};
