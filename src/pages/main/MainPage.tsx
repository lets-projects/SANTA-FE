import SliderBannerImg from './components/SliderBannerImg';
import { Button } from '../../components/common/Button';
import SectionTitle from '../../components/SectionTitle';
import Thumbnail from '../../components/Thumbnail';
// import Toggle from './components/Toggle';
import MeetingList from './components/MainMeetingList';
import UserRankList from './components/MainRankList';

import styles from './mainPage.module.scss';

import { getMeetings } from '/src/services/meeting';
import { getMainPagesRanks } from '/src/services/ranks';
import { getChallengeList } from '/src/services/challengeApi';

import { useQuery } from '@tanstack/react-query';
import { paths } from '/src/utils/path';
import { useNavigate } from 'react-router-dom';
import { getPreferCategory } from '/src/services/categoryApi';
import { getAccessToken, getIsUser } from '/src/services/auth';

export default function Main() {
  const { data: meetings } = useQuery({ queryKey: ['meetings'], queryFn: getMeetings });
  const { data: ranks } = useQuery({ queryKey: ['ranks'], queryFn: getMainPagesRanks });
  const { data: challenges } = useQuery({ queryKey: ['challenges'], queryFn: getChallengeList });
  const navigation = useNavigate();
  const isLogin = getAccessToken();
  const isUser = getIsUser();

  const { data: preferCategory } = useQuery({
    queryKey: ['preferCategory'],
    queryFn: getPreferCategory,
    select: (data) => data.data,
    staleTime: Infinity,
  });

  if (isLogin && isUser && preferCategory) {
    preferCategory.length == 0 && navigation(paths.CATEGORY);
  }

  //김경혜 - 메인페이지 안보이는 오류 수정
  // if (!meetings && !ranks && !challenges) return <div>Loading...</div>;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bannerWrapper}>
          <SliderBannerImg />
        </div>
        <div className={styles.flex}>
          <div className={styles.buttonWrapper}>
            <Button
              onClick={() => {
                navigation(paths.MOUNTAIN_VERTIFY);
              }}
              color="danger"
              size='fluent'
              variant='rounded'
            >
              내 인증 바로가기
            </Button>
          </div>
          <div className={styles.sectionWrapper}>
            <SectionTitle
              title="챌린지 둘러보기🌟"
              subtitle="업적을 달성할 수 있는 챌린지를 확인해보세요!"
              targetPageUrl={paths.CHALLENGE}
            />
            {challenges ? (
              <Thumbnail data={challenges} isHotTopic={true} isIndexChip={true} isChallenge={true} />
            ) : (
              <div className={styles.noData}>로그인하고 챌린지를 확인하세요!</div>
            )}
          </div>
          <div>
            <div className={styles.sectionWrapper}>
              {/* 김경혜 
              <div className={styles.toggleWrapper}>
                <Toggle />
              </div> */}
              <SectionTitle
                title="신규 모임🙌"
                subtitle="현재 진행중인 모임을 확인해보세요."
                targetPageUrl={paths.GATHERING}
              />
              {meetings && <MeetingList meetings={meetings} />}
            </div>
          </div>
          <div>
            <SectionTitle title="랭킹🏅" subtitle="이달의 랭킹을 확인해보세요!" targetPageUrl={paths.RANK} />
            {ranks && <UserRankList ranks={ranks} />}
          </div>
        </div>
      </div>
    </>
  );
}
