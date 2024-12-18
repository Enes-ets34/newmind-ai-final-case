import Counter from '@/components/counter/Counter';
import { CartItemProps } from './cartListItem.types';
import {
  useDeleteCartMutation,
  useUpdateCartMutation,
} from '@/queries/cart/cart.mutation';
import { useIsDeleteCart } from '@/hooks/useIsDeleteCart';

const CartListItem: React.FC<CartItemProps> = ({
  item,
  className,
  products,
}) => {
  const { increment, decrement } = useUpdateCartMutation();
  const { deleteCart } = useDeleteCartMutation();
  const isDeleteCart = useIsDeleteCart(products, item?.product?._id || '');

  const handleIncrease = () => {
    if (item) {
      increment(item.product._id);
    }
  };

  const handleDecrease = () => {
    if (item) {
      decrement(item.product._id);
      if (isDeleteCart) {
        deleteCart();
      }
    }
  };
  

  return (
    <li className={`flex justify-between items-center py-2 ${className || ''}`}>
      <span className='flex flex-col'>
        <p className='text-black'>
          {item?.product?.title && item?.product?.title?.length > 15
            ? item?.product.title.slice(0, 15) + '...'
            : item?.product?.title}
        </p>
        <p className='text-primary font-semibold'>
          ₺{item?.product?.discountedPrice || item?.product?.price}
        </p>
      </span>
      <Counter
        quantity={item?.quantity || 0}
        productId={item?._id}
        direction={'horizontal'}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
    </li>
  );
};

export default CartListItem;
