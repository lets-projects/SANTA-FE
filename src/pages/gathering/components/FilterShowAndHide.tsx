import { MouseEventHandler, PropsWithChildren } from 'react';
import styles from '../../../styles/gathering/gatheringSearch.module.scss';
import { IoCheckmarkCircleOutline, IoCheckmarkCircleSharp } from 'react-icons/io5';

type FilterShowAndHideProps = {
  isHide: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
};
export default function FilterShowAndHide({ isHide, onClick, children }: PropsWithChildren<FilterShowAndHideProps>) {
  return (
    <div className={`${styles.iconTextContainer} ${styles.pointer}`} onClick={onClick}>
      {isHide ? <IoCheckmarkCircleSharp color="#498428" /> : <IoCheckmarkCircleOutline color="#498428" />}
      <div className={styles.body1}>{children}</div>
    </div>
  );
}
