import IssueChip from './IssueChip';
import '../pages/main/main.style.scss';

interface ThumnailProps {
  img: string;
  title: string;
  isHotTopic: boolean;
}
export default function Thumbnail({ img, title, isHotTopic }: ThumnailProps) {
  // todo api 연결 후 map으로 출력, img 태그 변경
  return (
    <div className="thumnail-container">
      <div className="thumnail-item-box">
        <div className="index-badge">1</div>
        {isHotTopic ? (
          <div className="chip-wrapper">
            <IssueChip />
          </div>
        ) : (
          ''
        )}
        <div className="img">{img}</div>
        <p className="thumnail-title">{title}</p>
      </div>
      <div className="thumnail-item-box">
        <div className="index-badge">1</div>
        {isHotTopic ? (
          <div className="chip-wrapper">
            <IssueChip />
          </div>
        ) : (
          ''
        )}
        <div className="img">{img}</div>
        <p className="thumnail-title">{title}</p>
      </div>{' '}
      <div className="thumnail-item-box">
        <div className="index-badge">1</div>
        {isHotTopic ? (
          <div className="chip-wrapper">
            <IssueChip />
          </div>
        ) : (
          ''
        )}
        <div className="img">{img}</div>
        <p className="thumnail-title">{title}</p>
      </div>
    </div>
  );
}
