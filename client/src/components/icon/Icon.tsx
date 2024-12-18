import React from 'react';
import { Icons } from '@theme/Icons'; // İkonları içe aktarıyoruz
import Colors from '@theme/Colors'; // Renkleri içe aktarıyoruz
import { icons } from '@theme/Icons'; // Icon'ları type olarak içe aktarıyoruz

// IconProps interface'i
export interface IconProps {
  source: icons | null; // Hangi ikonu kullanacağımızı belirler
  size: { width?: number; height?: number }; // İkon boyutunu belirler
  color?: keyof typeof Colors | string; // İkonun rengini belirler
  stroke?: boolean; // Çizgi (stroke) ekleyip eklemeyeceğimizi belirler
  className?: string; // Ekstra sınıf adını belirler
}

// Icon componenti
const Icon: React.FC<IconProps> = ({
  source,
  size,
  color = 'primary',
  stroke = false,
  className,
}) => {
  // İkonu seçiyoruz
  const SelectedIcon = source ? Icons[source] : null;

  if (!SelectedIcon) {
    return null;
  }

  // İkonu render ediyoruz
  return (
    <SelectedIcon
      width={size.width || 24} // width'i belirliyoruz
      height={size.height || 24} // height'i belirliyoruz
      fill={color ? color || color : Colors.primary} // Renk ayarını yapıyoruz
      stroke={stroke ? 'currentColor' : undefined} // Çizgi (stroke) ekliyoruz
      className={className} // className ekliyoruz
    />
  );
};

export default Icon;
