import { Chips } from '../../../components/common/Chips';
import styles from '../../../styles/gathering/gatheringCategory.module.scss';
import { GatheringCategoryType } from '/src/types/gatheringTypes';
import { useCategoryList } from '/src/utils/useCategoryList';

type GatheringCategoryProps = {
  selectedCategory: GatheringCategoryType;
  setSelectedCategory: (category: GatheringCategoryType) => void;
};
export function GatheringCategory({ selectedCategory, setSelectedCategory }: GatheringCategoryProps) {
  const categoryList = useCategoryList<GatheringCategoryType[]>((data) => data.data);

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.categoryContainer}>
        {categoryList &&
          [{ id: 0, name: '맞춤추천' }, ...categoryList].map((category: GatheringCategoryType) => (
            <Chips
              key={category.id}
              variant={`${category.name == selectedCategory.name ? 'square-green3' : 'square-green2'}`}
              onClick={() => {
                setSelectedCategory({ id: category.id, name: category.name });
              }}
            >
              {category.name}
            </Chips>
          ))}
      </div>
    </div>
  );
}
