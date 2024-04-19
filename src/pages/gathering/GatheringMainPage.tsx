import { GatheringList } from './components/GatheringList';
import '../../styles/gathering/gatheringMain.scss';
import SectionTitle from '../../components/SectionTitle';
function GatheringMainPage() {
  return (
    <div className="gathering-container">
      <SectionTitle
        title="인기 모임"
        subtitle="현재 진행중인 챌린지/모임을 확인해보세요!"
        isThereMoreButton={false}
        isThereToggle={false}
      />
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
