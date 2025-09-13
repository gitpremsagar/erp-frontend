import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const useAppStore = () => {
  const categories = useSelector((state: RootState) => state.categories);
  // const subCategories = useSelector((state: RootState) => state.subCategories); // TODO: Add when subCategories slice is implemented
  const productTags = useSelector((state: RootState) => state.productTags);
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);

  return {
    categories,
    // subCategories, // TODO: Add when subCategories slice is implemented
    productTags,
    auth,
    user,
  };
};
