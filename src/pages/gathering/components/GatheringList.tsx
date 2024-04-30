import { useEffect } from 'react';
import styles from '../../../styles/gathering/gatheringList.module.scss';
import useIntersectionObserver from '/src/hooks/useIntersectionObserver';
type Props = {
  title: string;
  content: string;
  tag: string;
  imageUrl: string;
  mountain: string;
  capacity: number;
  attendance: number;
  date: string;
  isLast?: boolean;
  nextPage?: () => void;
};
export function GatheringList({
  title,
  content,
  tag,
  imageUrl,
  mountain,
  capacity,
  attendance,
  date,
  isLast,
  nextPage,
}: Props) {
  const { targetRef } = useIntersectionObserver<HTMLDivElement>(() => {
    console.log('들어왔음');
    if (nextPage) {
      nextPage();
    }
  });

  useEffect(() => {
    console.log(isLast);
  }, [isLast]);
  return (
    <div
      className={styles.gatheringListContainer}
      ref={(_ref) => {
        if (typeof _ref !== 'function' && isLast) {
          console.log('ref 할당');
          _ref = targetRef.current;
        }
      }}
    >
      <div className={styles.image}>이미지</div>
      <div className={styles.textContainer}>
        <div className={styles.subtitle1}>{title}</div>
        <div className={`${styles.body2} ${styles.hidden}`}>{content}</div>
        <div className={`${styles.infoContainer} ${styles.body2}`}>
          <div className={styles.tag}>{tag}</div>
          <div>{mountain}</div>
          <div>
            {attendance}/{capacity}(명)
          </div>
          <div>{date}</div>
        </div>
      </div>
    </div>
  );
}

//title, content, tag, image, mountain, member, date
