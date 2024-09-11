import IssueChip from './IssueChip';
import styles from '../styles/components/thumbnail.module.scss';
import { ThumbnailChallenge } from '../services/challengeApi';
import { useNavigate } from 'react-router-dom';
import { paths } from '../utils/path';

interface ThumbnailItems extends ThumbnailChallenge {}
interface ThumbnailProps {
  data: ThumbnailItems[];
  isHotTopic: boolean;
  isIndexChip: boolean;
  isChallenge?: true;
}
export default function Thumbnail({ data, isHotTopic, isIndexChip, isChallenge }: ThumbnailProps) {
  const navigate = useNavigate();
  function handleThumbnailClick(id: number, isChallenge?: boolean) {
    if (isChallenge) return navigate(`${paths.CHALLENGE_DETAIL}?id=${id}`);
    navigate(`/gathering/detail?meetingid=${id}`);
  }
  return (
    <div className={styles.thumbnailContainer}>
      {data.map((item, index) => (
        <div className={styles.thumbnailItemBox} key={item.id}>
          {isIndexChip && (
            <div className={styles.badgeContainer}>
              {/* <img src="images/thumbnail-label.png" alt={`${index + 1}`} className={styles.indexBadge} /> 김경혜*/}
              <p className={styles.indexText}>{`${index + 1}`}</p>
            </div>
          )}
          {isHotTopic && (
            <div className={styles.chipWrapper}>
              <IssueChip />
            </div>
          )}
          <div className={styles.imgWrapper} onClick={() => handleThumbnailClick(item.id, isChallenge)}>
            <div className={styles.overlay}></div>
            <img className={styles.img} src={item.image} />
          </div>
          <p className={styles.thumbnailTitle}>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
