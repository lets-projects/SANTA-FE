import { Chips } from '../../../components/common/Chips';
import '../../../styles/gathering/gatheringList.scss';
type Props = {
  title: string;
  content: string;
  tag: string;
  imageUrl: string;
  mountain: string;
  capacity: number;
  attendance: number;
  date: string;
};
export function GatheringList({ title, content, tag, imageUrl, mountain, capacity, attendance, date }: Props) {
  return (
    <div className="gathering-list-container">
      <div className="image">이미지 : {imageUrl}</div>
      <div className="text-container">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
        <div className="info-container">
          <Chips variant="green3">{tag}</Chips>
          <div>{mountain}</div>
          <div>
            멤버 {attendance}/{capacity}
          </div>
          <div>날짜 {date}</div>
        </div>
      </div>
    </div>
  );
}

//title, content, tag, image, mountain, member, date
