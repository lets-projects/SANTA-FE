import { TitleContainer } from './components/TitleContainer';
import styles from '../../styles/gathering/gatheringPostPage.module.scss';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { Button } from '../../components/common/Button';

export function PostPage() {
  return (
    <div className={styles.mainContainer}>
      <TitleContainer title="모임 만들기" />
      <div className={styles.inputContainer}>
        <div className={styles.containerRow}>
          <div className={`${styles.containerCol} ${styles.width60}`}>
            <input placeholder="카테고리" />
            <input placeholder="카테고리" />
          </div>
          <div className={styles.imageContainer}>
            <input type="file" placeholder="사진" className={styles.imageInput} />
          </div>
        </div>
        <input type="text" placeholder="모임이름" />
        <textarea rows={10} cols={33} className={styles.textarea} placeholder="모임 목적을 설명하세요" />
        <div>
          <div className={styles.containerCol}>
            <div className={styles.containerRow}>
              <div className={styles.containerRow}>
                <IoPersonOutline />
                <div>정원</div>
              </div>
              <div className={`${styles.width100} ${styles.containerRow} ${styles.grayBack}`}>
                <input type="text" />
                <div>명</div>
              </div>
            </div>
            <div className={styles.containerRow}>
              <div className={styles.containerRow}>
                <IoCalendarClearOutline />
                <div>날짜</div>
              </div>
              <div className={`${styles.width100} ${styles.containerRow} ${styles.grayBack}`}>
                <input type="text" />
              </div>
            </div>
            <div className={`${styles.outlineContainer} ${styles.containerRow}`}>
              <div>태그</div>
            </div>
          </div>
        </div>
        <Button variant="green3">모임 만들기 </Button>
      </div>
    </div>
  );
}
