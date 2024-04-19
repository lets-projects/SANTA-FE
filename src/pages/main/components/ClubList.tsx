import IssueChip from '../../../components/IssueChip';
interface ClubListProps {
  id: string;
  title: string;
  isNew: boolean;
  isHotTopic: boolean;
}
const MOCKUP_LIST: ClubListProps[] = [
  { id: '1', title: '플로깅 챌린지 같이하실 분🌱', isNew: false, isHotTopic: true },
  { id: '2', title: '100대 명산 도전 주 1회 함께해요', isNew: false, isHotTopic: true },
  { id: '3', title: '직장인 취미 등산 같이하실분 구해요', isNew: false, isHotTopic: true },
  { id: '4', title: '올레길 탐방 같이하실분!!', isNew: false, isHotTopic: true },
  { id: '5', title: '제주도 오름오르기 함께하실 분 있나요?!', isNew: false, isHotTopic: true },
];
export default function ClubList() {
  return (
    <div>
      {MOCKUP_LIST.map((item) => (
        <div className="clublist-item-box">
          <div className="chip-place">{item.isHotTopic ? <IssueChip /> : ''}</div>
          <p className="club-title">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
