import { CategoriesProps } from './categories.types';
import Image from '../image/Image';
import Icon from '../icon/Icon';
import { Category, SubCategory } from '@/queries/categories/category.types';
import { categoriesStyles } from './categories.styles';
import { useNavigate } from 'react-router-dom';

const Categories: React.FC<CategoriesProps> = ({
  categories,
  openCategory,
  selectedSubCategory,
  setOpenCategory,
  setSelectedSubCategory,
  categoryIsLoading,
}) => {
  const navigate = useNavigate();
  const toggleCategory = (category: Category) => {
    if (openCategory?._id === category?._id) {
      if (setOpenCategory) {
        setOpenCategory(null);
      }
    } else {
      if (setOpenCategory) {
        setOpenCategory(category);
      }
      if (navigate) {
        navigate(`/categories?key=${category?.slug}`);
      }
    }
  };
  if (categories?.length === 0) return null;
  if (categoryIsLoading) return <div>loading...</div>;
  return (
    <div className={categoriesStyles.wrapper}>
      <h3 className='font-semibold hidden sm:block text-black'>Kategoriler</h3>
      <ul className={categoriesStyles.list}>
        {categories?.map((category: Category) => (
          <div key={category?._id}>
            <li
              className={`flex group cursor-pointer ${
                openCategory?._id === category?._id
                  ? 'bg-primaryLight'
                  : 'bg-white'
              } ${categoriesStyles.categoryItem}`}
              onClick={() => toggleCategory(category)}
            >
              <div className='flex gap-2 items-center'>
                <Image
                  src={category?.imageUrl || ''}
                  className={categoriesStyles.image}
                  objectFit='contain'
                />
                <span className='font-semibold'>{category?.title}</span>
              </div>
              <Icon
                source={'chevron'}
                size={{ width: 10, height: 10 }}
                className={`transform  ${
                  openCategory?._id === category?._id
                    ? '-rotate-90 fill-primary'
                    : 'rotate-90'
                }`}
                color='gray'
              />
            </li>
            {openCategory?._id === category?._id && (
              <ul>
                {category.subCategories?.map((subCategory: SubCategory) => (
                  <li
                    key={subCategory?._id}
                    onClick={() =>
                      setSelectedSubCategory &&
                      setSelectedSubCategory(subCategory?._id || null)
                    }
                    className={categoriesStyles.subCategory}
                  >
                    <span className='font-semibold text-grayMid '>
                      {subCategory?.title}
                    </span>
                    {selectedSubCategory === subCategory?._id && (
                      <Icon
                        source={'chevron'}
                        size={{ width: 10, height: 10 }}
                        className='fill-primary'
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
