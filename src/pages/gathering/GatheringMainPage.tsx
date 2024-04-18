import { GatheringList } from './components/GatheringList';

function GatheringMainPage() {
  return (
    <div className="gathering-container">
      <div>
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
    </div>
  );
}

export default GatheringMainPage;
