import styles from '../../styles/gathering/gatheringSearch.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getGatheringSearchResult } from '/src/services/gatheringApi';
import { SearchNoResult } from './components/SearchNoResults';
import { TitleContainer } from './components/TitleContainer';
import { IoCheckmarkCircleOutline, IoCheckmarkCircleSharp } from 'react-icons/io5';
import { GatheringList } from './components/GatheringList';
import { isClosedGathering } from '/src/utils/isClosedGathering';
import { GatheringListByCategory } from '/src/types/gatheringTypes';
const PAGE_SIZE = 10;
export function GatheringSearchResultPage() {
  const [searchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  // const [searchLists, setSearchLists] = useState<GatheringListByCategory[]>([]);
  useEffect(() => {
    const keyword = searchParams.get('keyword');
    if (keyword) {
      setSearchKeyword(keyword);
    } else {
      setSearchKeyword('');
    }
  }, [searchParams]);

  //useInfiniteQuery
  const fetchGatheringSearchResult = async (pageParam: number) => {
    const res = await getGatheringSearchResult(searchKeyword, pageParam, PAGE_SIZE);
    console.log(res);
    return {
      content: res.data.content,
      nextCursor: res.data.pageable.pageNumber + 1,
      hasNextPage: res.data.pageable.pageNumber < res.data.totalPages - 1,
      pageParams: {
        pageNumber: res.data.pageable.pageNumber,
        pageSize: res.data.pageable.pageSize,
      },
    };
  };
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['searchList', searchKeyword],
    queryFn: ({ pageParam }) => fetchGatheringSearchResult(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
    select: (data) => ({
      gatheringList: data.pages,
      pages: data?.pages.flatMap((page) => page.content) || [],
      pageParams: data?.pages.map((page) => page.pageParams).filter(Boolean) || [],
    }),
  });

  const searchLists: GatheringListByCategory[] = data?.pages || [];

  const [showInProgress, setShowInProgress] = useState(false);
  const [sortByLatest, setSortByLatest] = useState(true);
  const navigate = useNavigate();
  function clickShowInProgress() {
    setShowInProgress(!showInProgress);
  }
  function clickFilter(filter: string) {
    if (filter === '최신순') {
      setSortByLatest(true);
    } else if (filter === '인기순') {
      setSortByLatest(false);
    }
  }

  function returnClassName(date: string) {
    //작성자의 id와 모임장의 id가 같으면 styles.bgLightYellow

    if (isClosedGathering(date)) {
      //활동 완료된 모임 숨기기 버튼 클릭시 display:none
      if (!showInProgress) {
        return `${styles.width100}`;
      } else {
        return `${styles.width100} ${styles.displayNone}`;
      }
    } else {
      return `${styles.width100}`;
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerRow}>
        <TitleContainer title={`${searchKeyword} 검색 결과`} />
      </div>
      {searchLists.length === 0 && searchKeyword && <SearchNoResult keyword={searchKeyword} />}
      {searchLists && (
        <div className={styles.containerCol}>
          <div className={styles.containerRow}>
            <div className={`${styles.iconTextContainer} ${styles.pointer}`} onClick={clickShowInProgress}>
              {showInProgress ? (
                <IoCheckmarkCircleSharp color="#498428" />
              ) : (
                <IoCheckmarkCircleOutline color="#498428" />
              )}
              <div className={styles.body1}>모집중인 모임만 보기</div>
            </div>
            <div className={`${styles.filterContainer} ${styles.subtitle2}`}>
              <div
                className={`${styles.pointer} ${sortByLatest ? styles.green3Font : ''}`}
                onClick={() => clickFilter('최신순')}
              >
                최신순
              </div>
              <div
                className={`${styles.pointer} ${sortByLatest ? '' : styles.green3Font}`}
                onClick={() => clickFilter('인기순')}
              >
                인기순
              </div>
            </div>
          </div>
          {searchLists.map((item, index) => (
            <div key={item.meetingId} className={returnClassName(item.date)}>
              <GatheringList
                gatheringInfo={{
                  title: item.meetingName,
                  content: item.description,
                  tag: item.categoryName,
                  imageUrl: item.image,
                  mountain: item.mountainName,
                  capacity: item.headcount,
                  attendance: item.participants.length,
                  date: item.date,
                }}
                isLast={hasNextPage && searchLists.length === index + 1 && !isFetching}
                setPage={fetchNextPage}
                onClick={() => navigate(`/gathering/detail?meetingid=${item.meetingId}`)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
