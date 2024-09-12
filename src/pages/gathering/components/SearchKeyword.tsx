import { Chips } from '../../../components/common/Chips';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import styles from '../../../styles/gathering/gatheringSearch.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getPopularGatherings } from '/src/services/gatheringApi';
import { useRecentSearchKeyword } from '/src/store/store';

export function SearchKeyword() {
  const { recentKeyword, deleteSearchKeyword } = useRecentSearchKeyword();
  const [isDeleted, setIsDeleted] = useState(false);
  function handleDeleteKeyword(index: number) {
    deleteSearchKeyword(index);
  }

  //인기 모임의 태그를 기반으로 검색어 추천
  const { data: popularKeywords, isSuccess } = useQuery({
    queryKey: ['popularKeywords'],
    queryFn: async () => await getPopularGatherings(0, 10),
    select: (data) => data?.data.content,
  });

  const tags = [...new Set(popularKeywords?.flatMap((list) => list.tags) ?? [])];

  return (
    <div>
      <div className={styles.containerCol}>
        <div className={styles.containerRow}>
          <div className={styles.subtitle1}>최근검색어</div>
          <div
            className={`${styles.subtitle2} ${styles.pointer}`}
            onClick={() => {
              setIsDeleted(!isDeleted);
            }}
          >
            {isDeleted ? '돌아가기' : '삭제하기'}
          </div>
        </div>
        <div className={`${styles.containerRow} ${styles.wrap}`}>
          {recentKeyword.length === 0 && <div className={`${styles.subtitle2} `}>최근 검색어가 존재하지 않습니다.</div>}
          {recentKeyword.length !== 0 &&
            recentKeyword.map((item, index) => (
              <div className={styles.chipContainer}>
                <Chips variant="green1">
                  <div className={styles.chipContainer}>
                    {item}
                    {isDeleted && (
                      <IoCloseOutline className={styles.closeBtn} onClick={() => handleDeleteKeyword(index)} />
                    )}
                  </div>
                </Chips>
              </div>
            ))}
        </div>
      </div>
      <div className={styles.containerCol}>
        <div className={styles.containerRow}>
          <div className={styles.subtitle1}>추천검색어</div>
        </div>
        <div className={`${styles.containerRow} ${styles.wrap}`}>
          {tags.length === 0 && <Chips variant="green2">산</Chips>}
          {isSuccess && tags.map((item) => <Chips variant="green2">{item}</Chips>)}
        </div>
      </div>
    </div>
  );
}
