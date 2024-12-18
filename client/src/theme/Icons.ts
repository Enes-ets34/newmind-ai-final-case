import LanguageIcon from '@assets/icons/language.svg?react';
import ProfileIcon from '@assets/icons/profile.svg?react';
import UserAddIcon from '@assets/icons/user-add.svg?react';
import GetirIcon from '@assets/icons/getir.svg?react';
import GetirSuIcon from '@assets/icons/getir-su.svg?react';
import GetirCarsiIcon from '@assets/icons/getir-carsi.svg?react';
import GetirYemekIcon from '@assets/icons/getir-yemek.svg?react';
import GetirBuyukIcon from '@assets/icons/getir-buyuk.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';
import HouseIcon from '@assets/icons/house.svg?react';
import ChevronIcon from '@assets/icons/chevron.svg?react';
import AlertCircleIcon from '@assets/icons/alert-circle.svg?react';
import CloseIcon from '@assets/icons/close.svg?react';
import CampaignIcon from '@assets/icons/campaign.svg?react';
import AccountIcon from '@assets/icons/account.svg?react';
import MailIcon from '@assets/icons/mail.svg?react';
import PhoneIcon from '@assets/icons/phone.svg?react';
import EditIcon from '@assets/icons/edit.svg?react';
import PlusIcon from '@assets/icons/plus.svg?react';
import HeartIcon from '@assets/icons/heart.svg?react';
import BagIcon from '@assets/icons/bag.svg?react';
import BagLilacIcon from '@assets/icons/bag-lilac.svg?react';
import MinusIcon from '@assets/icons/minus.svg?react';
import Delete1Icon from '@assets/icons/delete-1.svg?react';
import MapPinIcon from '@assets/icons/map-pin.svg?react';
import SuccessIcon from '@assets/icons/success.svg?react';

export const Icons = {
  language: LanguageIcon,
  profile: ProfileIcon,
  user_add: UserAddIcon,
  getir: GetirIcon,
  getir_buyuk: GetirBuyukIcon,
  getir_yemek: GetirYemekIcon,
  getir_su: GetirSuIcon,
  getir_carsi: GetirCarsiIcon,
  search: SearchIcon,
  house: HouseIcon,
  chevron: ChevronIcon,
  alert_circle: AlertCircleIcon,
  close: CloseIcon,
  campaign: CampaignIcon,
  account: AccountIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  edit: EditIcon,
  plus: PlusIcon,
  heart: HeartIcon,
  bag: BagIcon,
  bag_lilac: BagLilacIcon,
  minus: MinusIcon,
  delete_1: Delete1Icon,
  map_pin: MapPinIcon,
  success: SuccessIcon,
};

export type icons = keyof typeof Icons;
