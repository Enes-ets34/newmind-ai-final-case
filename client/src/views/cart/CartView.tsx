import React from 'react';
import { CartProps } from './cart.types';

import Products from './_components/cart-list/Products';
import AddressCard from './_components/address-card/AddressCard';
import TotalPrice from './_components/total-price/TotalPrice';
import Button from '@/components/button/Button';
import { cartViewStyles } from './cart.styles';
import { useCreatePaymentMutation } from '@/queries/payment/payment.mutation';
const CartView: React.FC<CartProps> = ({
  user,
  products,
  increment,
  decrement,
  deleteCart,
  totalPrice,
  selectedAddress,
}) => {
  const paymentMutation = useCreatePaymentMutation();
  const handleOnClick = async () => {
    await paymentMutation.mutate({});
  };
  if (!user) return null;
  return (
    <>
      {user && (
        <div className={cartViewStyles.wrapper}>
          <Products
            products={products}
            increment={increment}
            decrement={decrement}
            deleteCart={deleteCart}
          />
          <div className={cartViewStyles.secondSection}>
            <AddressCard address={selectedAddress} />
            <TotalPrice
              totalPrice={totalPrice || 0}
              className='hidden md:block'
            />
            <Button
              className='hidden sm:block'
              text='Sipariş ver'
              color='primary'
              onClick={handleOnClick}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CartView;
