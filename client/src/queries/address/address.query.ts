import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import httpRequest from '@api/httpRequest';
import { GetAddressResponse } from './address.types';

export const useGetAddressByIdQuery = () => {
  return useQuery<GetAddressResponse, Error>({
    queryKey: ['address'],
    queryFn: async () => {
      const response = await httpRequest.get<{
        status: string;
        data: GetAddressResponse;
      }>(`/addresses/user-addresses`);
      return response.data.data;
    },
    staleTime: 300000,
    refetchOnWindowFocus: false, 
  });
};
