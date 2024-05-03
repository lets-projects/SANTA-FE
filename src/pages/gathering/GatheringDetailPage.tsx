import { TitleContainer } from './components/TitleContainer';
import styles from '../../styles/gathering/gatheringDetailPage.module.scss';
import { FaMountain } from 'react-icons/fa';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { Chips } from '../../components/common/Chips';
import { VerticalProfile } from './components/VerticalProfile';
import { Button, DeleteBtn, EditBtn } from '../../components/common/Button';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGatheringDetailById } from '/src/services/gatheringApi';
import { boolean } from 'yup';
// import { api } from '/src/services/api';

export function GatheringDetailPage() {
  const [searchParams] = useSearchParams();
  const [meetingId, setMeetingId] = useState<string>('');
  const [isProfileClicked, setIsProfileClicked] = useState<boolean[]>([])
  useEffect(() => {
    const keyword = searchParams.get('meetingid');
    if (keyword) {
      setMeetingId(keyword);
    } else {
      setMeetingId('');
    }
  }, [searchParams])

  const { data: gatheringDetail, isLoading, error } = useQuery({
    queryKey: ['gatheringDetail', meetingId],
    queryFn: () => {
      return getGatheringDetailById(meetingId);

    },
    select: (data) => data?.data,
  })

  // const [gatheringDetail] = [
  //   {
  //     "meetingId": 0,
  //     "leaderId": 0,
  //     "meetingName": "string",
  //     "categoryName": "string",
  //     "mountainName": "string",
  //     "description": "string",
  //     "headcount": 0,
  //     "date": "2024-05-03",
  //     "tags": [
  //       "string"
  //     ],
  //     "image": "string",
  //     "participants": [
  //       {
  //         "userId": 0,
  //         "userName": "string",
  //         "userImage": "string"
  //       },
  //       {
  //         "userId": 1,
  //         "userName": "string",
  //         "userImage": "string"
  //       },
  //       {
  //         "userId": 2,
  //         "userName": "string",
  //         "userImage": "string"
  //       }
  //     ]
  //   }
  // ]

  useEffect(() => {
    console.log(gatheringDetail);
    const isProfileArray = new Array(gatheringDetail?.participants.length).fill(false);
    setIsProfileClicked(isProfileArray);
  }, [gatheringDetail])
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  function handleEditGatheringDetail() {
    console.log('edit');
  }
  function handleDeleteGatheringDetail() {
    console.log('delete')
  }

  function handleReport(index: number) {
    const newState = [...isProfileClicked];
    newState[index] = !isProfileClicked[index];
    setIsProfileClicked(newState);
  }

  return (
    <div className={styles.gatheringDetailContainer}>
      <TitleContainer title={gatheringDetail?.meetingName} />
      <div className={styles.infoContainer}>
        <div className={`${styles.containerRow}  ${styles.deleteEditContainer}`}>
          <EditBtn onClick={handleEditGatheringDetail} />
          <DeleteBtn onClick={handleDeleteGatheringDetail} />
        </div>
        <div className={styles.containerRow}>
          <img src="/defaultProfile.png" className={styles.imageContainer}></img>
          <div className={styles.topInfoContainer}>
            <div className={styles.iconTextContainer}>
              <FaMountain />
              <div>{gatheringDetail?.mountainName}</div>
            </div>
            <div className={styles.iconTextContainer}>
              <IoPersonOutline />
              <div>{gatheringDetail?.headcount}명</div>
            </div>
            <div className={styles.iconTextContainer}>
              <IoCalendarClearOutline />
              <div>{gatheringDetail?.date}</div>
            </div>
          </div>
        </div>
        <div className={styles.containerCol}>
          <div className={styles.textarea}>
            <div>{gatheringDetail?.description}</div>
          </div>
          <div className={styles.tagContainer}>
            {gatheringDetail?.tags.map((item: string, index: number) => (
              <div key={`${gatheringDetail?.meetingId}-${index}`}>
                <Chips variant="outline-green3">{item}</Chips>
              </div>
            ))}
          </div>
          <div className={styles.memberContainer}>
            <div className={styles.subtitle1}>참여인원</div>
            <div className={styles.profileListContainer}>
              {gatheringDetail?.participants.map((item, index) => (
                <div className={styles.profileContainer}>
                  <div key={`${item.userId} ${item.userName}`} onClick={() => handleReport(index)}>
                    {isProfileClicked[index] && (<div className={styles.reportBtn}>신고</div>)}
                    <VerticalProfile name={item.userName} imageUrl="/images/defaultProfile.png" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button variant="green3">참가신청하기</Button>
        </div>
      </div>
    </div >
  );
}
