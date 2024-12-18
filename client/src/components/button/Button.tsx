// Button.tsx
 ;

import React from 'react';
import { ButtonProps } from './button.types';
import { useStyles } from './button.styles';

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  color = 'primary',
  textColor = 'text-white',
  disabled = false,
  outlined = false,
  className = '',
}) => {
  const finalClassName = useStyles(
    color,
    textColor,
    disabled,
    outlined,
    className,
  );

  return (
    <button className={finalClassName} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
