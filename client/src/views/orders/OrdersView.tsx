import { useGetInvoices } from '@/queries/invoice/invoice.query';

import { ordersStyles } from './orders.styles';
import { GetInvoiceResponse, Invoice } from '@/queries/invoice/invoice.types';

export default function OrdersView({ ordersData }: any) {
  const invoicesQuery = useGetInvoices();
  console.log('invoicesQuery :>> ', invoicesQuery?.data);
  return (
    <div className={ordersStyles.wrapper}>
      <div className={ordersStyles.card}>
        {invoicesQuery?.data?.map((invoice: Invoice) => (
          <div className='flex justify-between items-start border-b border-primary'>
            <div className=' p-5'>
              {invoice.products?.map(product => (
                <p>
                  {/* @ts-ignore */}
                  {product?.product?.title} x{/* @ts-ignore */}
                  {JSON.stringify(product?.quantity)}
                </p>
              ))}
            </div>
            <div className='flex flex-col'>
              <div className='p-5'>{JSON.stringify(invoice?.totalPrice)}₺</div>
              <span className='p-5'>
                oluşturulma tarihi: <br />
                {new Date(invoice.createdAt).toLocaleString('tr-TR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
