import styles from '../../styles/gathering/gatheringMain.module.scss';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { useState } from 'react';
import { GatheringList } from './components/GatheringList';
import { TitleContainer } from './components/TitleContainer';
import { useNavigate } from 'react-router-dom';
import { getMyGatherings } from '/src/services/gatheringApi';
import { useQuery } from '@tanstack/react-query';
const PAGE_SIZE = 4;

export function ParticipatingGroupPage() {
  const [showInProgress, setShowInProgress] = useState(false);
  const navigate = useNavigate();
  const [page] = useState(0);
  // const [page, setPage] = useState(0);


  const { data: myGatherings } = useQuery({
    queryKey: ['myGatherings'],
    queryFn: () => getMyGatherings(page, PAGE_SIZE),
    select: (data) => {
      return {
        content: data.data.content,
        totalPage: data.data.totalPages,
      };
    },
  })
  // const data = [
  //   {
  //     leaderId: '23333',
  //     meetingId: 1123,
  //     title: '한라산 등반 모임',
  //     content: '한라산에서 함께 등산하실 분',
  //     tag: '힐링',
  //     mountain: '한라산',
  //     imageUrl: './',
  //     capacity: 16,
  //     attendance: 4,
  //     date: '2023.08.14',
  //   },
  //   {
  //     leaderId: '2333411',
  //     meetingId: 1234,
  //     title: '한라산 등반 모임',
  //     content: '한라산에서 함께 등산하실 분',
  //     tag: '힐링',
  //     mountain: '한라산',
  //     imageUrl: './',
  //     capacity: 16,
  //     attendance: 4,
  //     date: '2023.08.14',
  //   },
  // ];
  function clickShowInProgress() {
    setShowInProgress(!showInProgress);
  }
  return (
    <div className={styles.gatheringContainer}>
      <TitleContainer title="참여중인 모임" />
      <div className={`${styles.container} ${styles.gap}`}>
        <div className={`${styles.iconTextContainer} ${styles.pointer}`} onClick={clickShowInProgress}>
          {showInProgress ? <IoCheckmarkCircleSharp color="#498428" /> : <IoCheckmarkCircleOutline color="#498428" />}
          <div className={styles.body1}>활동 완료된 모임 숨기기</div>
        </div>
        {myGatherings?.content.map((item) => (
          <div
            key={item.meetingId}
            className={`${styles.width100} ${styles.bgLightYellow} ${styles.borderRadius} ${styles.padding}`}
          >
            <GatheringList
              gatheringInfo={{
                title: item.meetingName,
                content: item.description,
                tag: item.tags,
                imageUrl: item.image,
                mountain: item.mountainName,
                capacity: item.headcount,
                attendance: item.participants.length,
                date: item.date,
              }}

              onClick={() => navigate(`/gathering/detail?meetingid=${item.meetingId}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
