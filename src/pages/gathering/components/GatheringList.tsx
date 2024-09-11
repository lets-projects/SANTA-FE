import styles from '../../../styles/gathering/gatheringList.module.scss';
import useIntersectionObserver from '/src/hooks/useIntersectionObserver';
type Props = {
  gatheringInfo: GatheringInfoType;
  isLast?: boolean;
  setPage?: () => void;
  onClick: () => void;
  state: 'default' | 'myGatherings' | 'attendingGatherings' | 'completedGatherings';
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
};
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
export function GatheringList({ gatheringInfo, isLast, setPage, onClick }: Props) {
  const { targetRef } = useIntersectionObserver<HTMLDivElement>(() => {
    if (isLast && setPage) {
      setPage();
    }
  });

  return (
    <div
      className={styles.gatheringListContainer}
      ref={(_ref) => {
        if (isLast) {
          targetRef.current = _ref;
        }
      }}
      onClick={onClick}
    >
      <img className={styles.image} src={gatheringInfo.imageUrl}></img>
      <div className={styles.textContainer}>
        <div className={styles.subtitle1}>{gatheringInfo.title}</div>
        <div className={`${styles.body2} ${styles.hidden}`}>{gatheringInfo.content}</div>
        <div className={`${styles.infoContainer} ${styles.body2}`}>
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
