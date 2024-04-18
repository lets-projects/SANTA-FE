import { GatheringList } from './components/GatheringList';
import '../../styles/gathering/gatheringMain.scss';
function GatheringMainPage() {
  return (
    <div className="gathering-container">
      <GatheringList
        title={'한라산 등반 모임'}
        content={'한라산에서 함께 등산하실 분'}
        tag={'힐링'}
        mountain="한라산"
        imageUrl="./"
        capacity={16}
        attendance={4}
        date="2023.08.14"
      />{' '}
    </div>
  );
}

export default GatheringMainPage;
