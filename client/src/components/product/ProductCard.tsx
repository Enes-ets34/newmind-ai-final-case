 ;

import React from 'react';
import { ProductProps } from './product.types';
import Icon from '../icon/Icon';
import Colors from '@/theme/Colors';
import Image from '../image/Image';
import { productCardStyles } from './product.styles';
import { useCartStore } from '@/store/cart';
import Counter from '../counter/Counter';
import {
  useCreateCartMutation,
  useDeleteCartMutation,
  useUpdateCartMutation,
} from '@/queries/cart/cart.mutation';
import { useIsDeleteCart } from '@/hooks/useIsDeleteCart';
import { useModalStore } from '@/store/modal';
import Login from '../login-modal/Login';

const ProductCard: React.FC<ProductProps> = ({ product, user }) => {
  const { products } = useCartStore();
  const { openModal, setContent } = useModalStore();
  const { increment, decrement } = useUpdateCartMutation();
  const createCartMutation = useCreateCartMutation();
  const { deleteCart } = useDeleteCartMutation();
  const isDeleteCart = useIsDeleteCart(products, product._id);
  const avaliableProduct = products?.find(
    item => item?.product?._id === product?._id
  );
  const handleIncrease = () => {
    if (!user) {
      handleModal();
    } else {
      if (avaliableProduct) {
        increment(avaliableProduct.product._id);
      } else {
        increment(product._id);
      }
    }
  };
  const handleAddCart = () => {
    if (products?.length > 0) {
      handleIncrease();
    } else {
      if (!user) {
        handleModal();
      } else {
        createCartMutation.mutate({
          products: [
            {
              product: product?._id,
              quantity: 1,
            },
          ],
        });
      }
    }
  };
  const handleModal = () => {
    openModal();
    setContent(<Login />);
  };

  const handleDecrease = () => {
    if (avaliableProduct) {
      decrement(avaliableProduct.product._id);
      if (isDeleteCart) {
        deleteCart();
      }
    }
  };

  return (
    <div className={productCardStyles.wrapper}>
      {!!avaliableProduct && user ? (
        <div className='absolute top-1 right-1'>
          <Counter
            quantity={avaliableProduct?.quantity}
            direction='vertical'
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        </div>
      ) : (
        <button
          onClick={() => handleAddCart()}
          className={productCardStyles.addToCartButton}
        >
          <Icon
            size={{ width: 10 }}
            color={Colors.primary}
            className=''
            source={'plus'}
          />
        </button>
      )}
      <div className={productCardStyles.body}>
        <a href={`product/${product?.slug}`}>
          <Image src={product?.imageUrl as string} className='w-28 h-28' />
        </a>
        <div className='flex items-center gap-2'>
          {product?.discountedPrice && (
            <p className='text-grayStorm line-through'>₺{product?.price}</p>
          )}
          <p className={productCardStyles.price}>₺{product?.discountedPrice || product?.price}</p>
        </div>
        <p className={productCardStyles.title}>{product?.title}</p>
        <p className={productCardStyles.description}>{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
