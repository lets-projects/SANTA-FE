import styles from '../../styles/gathering/gatheringMain.module.scss';

import { useEffect, useState } from 'react';
import { GatheringList } from './components/GatheringList';
import { TitleContainer } from './components/TitleContainer';
import { useNavigate } from 'react-router-dom';
import { getMyGatherings } from '/src/services/gatheringApi';
import { useQuery } from '@tanstack/react-query';
import { useUserInfo } from '/src/utils/useUserInfo';
import { compareUserAndLeader } from '/src/utils/compareUserAndLeader';
import { isClosedGathering } from '/src/utils/isClosedGathering';
import { GatheringListByCategory } from '/src/types/gatheringTypes';
import FilterShowAndHide from './components/FilterShowAndHide';
const PAGE_SIZE = 10;

export function ParticipatingGroupPage() {
  const [showInProgress, setShowInProgress] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [gatheringList, setGatheringList] = useState<GatheringListByCategory[]>([]);

  //내가 참여중인 모임 리스트 불러오괴
  const {
    data: myGatherings,
    isFetched,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['myGatheringList', page],
    queryFn: () => getMyGatherings(page, PAGE_SIZE),
    select: (data) => {
      return {
        content: data.data.content,
        totalPage: data.data.totalPages - 1,
        totalElements: data.data.totalElements,
      };
    },
  });
  const currentUserId = useUserInfo((data) => data.id);

  useEffect(() => {
    // const isSuccess = isFetched && !isError;
    if (myGatherings?.totalElements === gatheringList.length) {
      return;
    }
    if (isSuccess && myGatherings) {
      if (page == 0) {
        setGatheringList([...myGatherings.content]);
      } else {
        setGatheringList((prevList) => [...prevList, ...myGatherings.content]);
      }
    }
  }, [isFetched, isError, myGatherings]);

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
              isLast={myGatherings && myGatherings?.totalPage > page && gatheringList.length === index + 1}
              setPage={setPage}
              onClick={() => navigate(`/gathering/detail?meetingid=${item.meetingId}`)}
              state={returnState(item.leaderId, item.date)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
