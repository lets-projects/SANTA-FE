import { useEffect, useState } from 'react';
import { Chips } from '../../../components/common/Chips';
import styles from '../../../styles/gathering/gatheringCategory.module.scss';
import { useCategoryStore } from '/src/store/store';

export function GatheringCategory() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { category, setCategory } = useCategoryStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categoryList, setCategoryList] = useState([
    '맞춤추천',
    '등산',
    '힐링',
    '정상깨기',
    '출사',
    '식도락',
    '백패킹',
    '기타',
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  //카테고리를 클릭해면 해당 값이 category state로 저장됨 (store 에서 관리)
  useEffect(() => {
    setCategory(categoryList[selectedIndex]);
  }, [selectedIndex]);

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.categoryContainer}>
        {categoryList.map((item, index) => (
          <Chips
            variant={`${item == categoryList[selectedIndex] ? 'square-green3' : 'square-green2'}`}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {item}
          </Chips>
        ))}
      </div>
    </div>
  );
}
