import styles from '../../styles/gathering/gatheringMain.module.scss';

import { useState } from 'react';
import { GatheringList } from './components/GatheringList';
import { TitleContainer } from './components/TitleContainer';
import { useNavigate } from 'react-router-dom';
import { getMyGatherings } from '/src/services/gatheringApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useUserInfo } from '/src/utils/useUserInfo';
import { compareUserAndLeader } from '/src/utils/compareUserAndLeader';
import { isClosedGathering } from '/src/utils/isClosedGathering';
import { GatheringListByCategory } from '/src/types/gatheringTypes';
import FilterShowAndHide from './components/FilterShowAndHide';
const PAGE_SIZE = 10;

export function ParticipatingGroupPage() {
  const [showInProgress, setShowInProgress] = useState(false);
  const navigate = useNavigate();

  //내가 참여중인 모임 리스트 불러오괴
  const fetchGatheringList = async (pageParam: number) => {
    const res = await getMyGatherings(pageParam, PAGE_SIZE);
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
    queryKey: ['myGatheringList'],
    queryFn: ({ pageParam }) => fetchGatheringList(pageParam),
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
  const currentUserId = useUserInfo((data) => data.id);
  const gatheringList: GatheringListByCategory[] = data?.pages || [];

  //진행중인 모임
  function clickShowInProgress() {
    setShowInProgress(!showInProgress);
  }

  function returnState(leaderId: number, date: string) {
    if (isClosedGathering(date)) {
      console.log('모임생성날짜/참여중인 모임', date);
      //활동 완료된 모임 숨기기 버튼 클릭시 display:none
      if (!showInProgress) {
        //종료된 모임 gray
        return `completedGatherings`;
      }
    } else {
      //작성자 == 모임장 이면 bgLightYellow
      if (compareUserAndLeader(currentUserId, 0, leaderId)) {
        return `myGatherings`;
      } else {
        //작성자 != 모임장이면 bgLightGreen
        return `attendingGatherings`;
      }
    }
    return 'default';
  }
  return (
    <div className={styles.gatheringContainer}>
      <TitleContainer title="참여중인 모임" />
      <div className={`${styles.container} ${styles.gap}`}>
        <FilterShowAndHide isHide={showInProgress} onClick={clickShowInProgress}>
          활동 완료된 모임 숨기기
        </FilterShowAndHide>
        {gatheringList?.map((item, index) => (
          <div
            key={item.meetingId}
            className={
              isClosedGathering(item.date) && showInProgress
                ? `${styles.displayNone}`
                : `${styles.gatheringListContainer}`
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
              isLast={hasNextPage && gatheringList.length === index + 1 && !isFetching}
              setPage={fetchNextPage}
              onClick={() => navigate(`/gathering/detail?meetingid=${item.meetingId}`)}
              state={returnState(item.leaderId, item.date)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
