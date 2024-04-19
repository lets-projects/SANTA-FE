import { GatheringList } from './components/GatheringList';
import SectionTitle from '../../components/SectionTitle';
import { UserProfile_small } from '../../components/common/UserProfile_small';
import { IoSearch } from 'react-icons/io5';
import { Button } from '../../components/common/Button';
import styles from '../../styles/gathering/gatheringMain.module.scss';
import Thumbnail from '../../components/Thumbnail';
function GatheringMainPage() {
  return (
    <div className={styles.gatheringContainer}>
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <UserProfile_small name="윤혜원" imageUrl="/images/profile.png" />
          <div className={styles.searchBtn}>
            <IoSearch color="#498428" />
            <div>모임을 검색해보세요</div>
          </div>
        </div>
        <Button variant="green3">모임 만들기</Button>
      </div>
      <SectionTitle
        title="인기 모임"
        subtitle="현재 진행중인 챌린지/모임을 확인해보세요!"
        isThereMoreButton={false}
        isThereToggle={false}
      />
      <Thumbnail img="/images/profile.png" title="한라산 등반" isHotTopic={false} />
      <GatheringList
        title={'한라산 등반 모임'}
        content={'한라산에서 함께 등산하실 분'}
        tag={'힐링'}
        mountain="한라산"
        imageUrl="./"
        capacity={16}
        attendance={4}
        date="2023.08.14"
      />
    </div>
  );
}

export default GatheringMainPage;
