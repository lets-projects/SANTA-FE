import styles from '../../../styles/gathering/gatheringList.module.scss';
import useIntersectionObserver from '/src/hooks/useIntersectionObserver';
type Props = {
  gatheringInfo: GatheringInfoType;
  isLast?: boolean;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  onClick: () => void;
  state:'default'|'myGatherings' | 'attendingGatherings'|'completedGatherings';
};
type GatheringInfoType = {
  title: string;
  content: string;
  tag: string;
  imageUrl: string;
  mountain: string;
  capacity: number;
  attendance: number;
  date: string;
}
/**
 * 
 * @param param0 title,
  content,
  tag,
  imageUrl,
  mountain,
  capacity,
  attendance,
  date,
 * @returns 
 */
export function GatheringList({
  gatheringInfo,
  isLast,
  setPage,
  onClick,
  state
}: Props) {
  const { targetRef } = useIntersectionObserver<HTMLDivElement>(() => {
    if (isLast && setPage) {
      setPage((prev) => prev + 1);
    }
  });

  return (
    <div
      className={`${styles.gatheringList} ${styles[state]}`}
      ref={(_ref) => {
        if (isLast) {
          targetRef.current = _ref;
        }
      }}
      onClick={onClick}
    >
      <img className={styles.image} src={gatheringInfo.imageUrl}></img>
      <div className={styles.textContainer}>
        <div className={styles.title}>{gatheringInfo.title}</div>
        <div className={`${styles.content} ${styles.hidden}`}>{gatheringInfo.content}</div>
        <div className={`${styles.infoContainer}`}>
          <div className={styles.tag}>{gatheringInfo.tag}</div>
          {/* 5글자 까지만 들어가도록 */}
          <div>{gatheringInfo.mountain}</div>
          <div>
            {gatheringInfo.attendance}/{gatheringInfo.capacity}(명)
          </div>
          <div>{gatheringInfo.date}</div>
        </div>
      </div>
    </div>
  );
}

//title, content, tag, image, mountain, member, date
