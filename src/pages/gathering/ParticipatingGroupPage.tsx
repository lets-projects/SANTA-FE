import styles from '../../styles/gathering/gatheringMain.module.scss';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
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
const PAGE_SIZE = 10;

export function ParticipatingGroupPage() {
  const [showInProgress, setShowInProgress] = useState(false);
  const navigate = useNavigate();

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
  const gatheringList: GatheringListByCategory[] = data?.pages || [];
  const currentUserId = useUserInfo((data) => data.id);

  //진행중인 모임
  function clickShowInProgress() {
    setShowInProgress(!showInProgress);
  }

  function returnClassName(leaderId: number, date: string) {
    //작성자의 id와 모임장의 id가 같으면 styles.bgLightYellow

    if (isClosedGathering(date)) {
      console.log('모임생성날짜/참여중인 모임', date);
      //활동 완료된 모임 숨기기 버튼 클릭시 display:none
      if (!showInProgress) {
        //종료된 모임 gray
        return `${styles.width100} ${styles.bgGray} ${styles.borderRadius} ${styles.padding}`;
      } else {
        return `${styles.displayNone}`;
      }
    } else {
      //작성자 == 모임장 이면 bgLightYellow
      if (compareUserAndLeader(currentUserId, 0, leaderId)) {
        return `${styles.width100} ${styles.bgLightYellow} ${styles.borderRadius} ${styles.padding}`;
      } else {
        //작성자 != 모임장이면 bgLightGreen
        return `${styles.width100} ${styles.bgLightGreen} ${styles.borderRadius} ${styles.padding}`;
      }
    }
  }
  return (
    <div className={styles.gatheringContainer}>
      <TitleContainer title="참여중인 모임" />
      <div className={`${styles.container} ${styles.gap}`}>
        <div className={`${styles.iconTextContainer} ${styles.pointer}`} onClick={clickShowInProgress}>
          {showInProgress ? <IoCheckmarkCircleSharp color="#498428" /> : <IoCheckmarkCircleOutline color="#498428" />}
          <div className={styles.body1}>활동 완료된 모임 숨기기</div>
        </div>
        {gatheringList?.map((item, index) => (
          <div key={item.meetingId} className={returnClassName(item.leaderId, item.date)}>
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
