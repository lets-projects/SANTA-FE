import styles from '../../styles/gathering/gatheringSearch.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGatheringSearchResult } from '/src/services/gatheringApi';
import { SearchNoResult } from './components/SearchNoResults';
import { TitleContainer } from './components/TitleContainer';
import { GatheringList } from './components/GatheringList';
import { isClosedGathering } from '/src/utils/isClosedGathering';
import { GatheringListByCategory } from '/src/types/gatheringTypes';
import FilterShowAndHide from './components/FilterShowAndHide';
const PAGE_SIZE = 10;
export function GatheringSearchResultPage() {
  const [searchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isNoResult, setIsNoResult] = useState(false);
  const [page, setPage] = useState(0);
  const [searchLists, setSearchLists] = useState<GatheringListByCategory[]>([]);
  useEffect(() => {
    const keyword = searchParams.get('keyword');
    if (keyword) {
      setSearchKeyword(keyword);
    } else {
      setSearchKeyword('');
    }
  }, [searchParams]);

  const {
    data: gatheringList,
    isFetched,
    isError,
  } = useQuery({
    queryKey: ['getSearchList', searchKeyword, page],
    queryFn: () => {
      return getGatheringSearchResult(searchKeyword, page, PAGE_SIZE);
    },
    select: (data) => {
      return {
        content: data?.data.content,
        totalPage: data?.data.totalPages - 1,
      };
    },
  });

  useEffect(() => {
    const isSuccess = isFetched && !isError;
    if (isSuccess && gatheringList) {
      if (gatheringList.content.length === 0 || !gatheringList) {
        setIsNoResult(true);
      } else {
        setIsNoResult(false);
      }

      if (page === 0) {
        setSearchLists([...gatheringList.content]);
      } else {
        setSearchLists((prev) => [...prev, ...gatheringList.content]);
      }
    } else if (isError) {
    }
  }, [gatheringList, isError, isFetched]);

  useEffect(() => {}, [page]);
  ////

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

  function returnState(date: string) {
    if (isClosedGathering(date)) {
      console.log('모임생성날짜/참여중인 모임', date);
      //활동 완료된 모임 숨기기 버튼 클릭시 display:none
      if (!showInProgress) {
        //종료된 모임 gray
        return `completedGatherings`;
      }
    }

    return 'default';
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerRow}>
        <TitleContainer title={`${searchKeyword} 검색 결과`} />
      </div>
      {isNoResult && searchKeyword && <SearchNoResult keyword={searchKeyword} />}
      {searchLists && (
        <div className={styles.gatheringListContainer}>
          <div className={styles.containerRow}>
            <FilterShowAndHide onClick={clickShowInProgress} isHide={showInProgress}>
              모집중인 모임만 보기
            </FilterShowAndHide>
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
            <div
              key={item.meetingId}
              className={
                isClosedGathering(item.date) && showInProgress ? `${styles.displayNone}` : `${styles.width100}`
              }
            >
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
                isLast={gatheringList && gatheringList?.totalPage > page && searchLists.length === index + 1}
                setPage={setPage}
                onClick={() => navigate(`/gathering/detail?meetingid=${item.meetingId}`)}
                state={returnState(item.date)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
