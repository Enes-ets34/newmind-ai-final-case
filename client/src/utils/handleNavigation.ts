import { RoutePaths } from '@/types/RoutePaths.enum';
import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: RoutePaths) => {
    navigate(`${route}`);
  };

  return handleNavigation;
};

export default useNavigation;
