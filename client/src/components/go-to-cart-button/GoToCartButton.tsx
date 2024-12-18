import { GoToCartButtonProps } from './button.types';
import { buttonStyles } from './button.styles';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

const GoToCartButton: React.FC<GoToCartButtonProps> = ({
  totalPrice,
  className,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${buttonStyles.cartPriceContainer} ${
        className ? className : ''
      }`}
    >
      <Button
        onClick={() => navigate('/cart')}
        color='primary'
        text='Sepete git'
        className='rounded-r-none w-full'
      />
      <span className={buttonStyles.cartPrice}>
        ₺{JSON?.stringify(totalPrice)?.slice(0, 5)}
      </span>
    </div>
  );
};
export default GoToCartButton;
