import { SliderMainImgBanner } from './components/SliderMainImgBanner';
import { Button } from '../../components/common/Button';
import SectionTitle from './components/SectionTitle';
import Thumbnail from './components/Thumbnail';
import Toggle from './components/Toggle';
import ClubList from './components/ClubList';
import RankList from './components/RankList';

export default function Main() {
  return (
    <div className="container">
      <div className="flex">
        <SliderMainImgBanner />
        <div className="button-wrapper">
          <Button onClick={() => {}} variant="yellow">
            내 인증 바로가기
          </Button>
        </div>
        <div className="section-wrapper">
          <SectionTitle
            title="챌린지 둘러보기"
            subtitle="업적을 달설할 수 있는 챌린지를 확인해보세요!"
            moreButtonId="1"
          />
          <Thumbnail img="이미지" title="막걸리 한잔" isHotTopic={true} />
        </div>
        {/* todo div 붙이기 */}
        <div className="m0">
          <div className="toggle-wrapper">
            <Toggle />
          </div>
          <SectionTitle title="신규 모임" subtitle="현재 진행중인 모임을 확인해보세요." moreButtonId="2" />
          <ClubList />
        </div>
        <div>
          <SectionTitle title="랭킹🏅" subtitle="이달의 랭킹을 확인해보세요!" moreButtonId="3" />
          <RankList />
        </div>
      </div>
    </div>
  );
}
