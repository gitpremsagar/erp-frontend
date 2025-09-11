import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const useAppStore = () => {
  const categories = useSelector((state: RootState) => state.categories);
  const subCategories = useSelector((state: RootState) => state.subCategories);
  const productTags = useSelector((state: RootState) => state.productTags);
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);

  return {
    categories,
    subCategories,
    productTags,
    auth,
    user,
  };
};
