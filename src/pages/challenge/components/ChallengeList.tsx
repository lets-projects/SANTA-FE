import { useRef } from 'react';

import { Card } from '/src/components/common/Card';
import styles from './ChallengeList.module.scss';

interface Challenge {
  name: string;
  imgUrl: string;
  description: string;
  progress: string;
}

export default function ChallengeBox({ data, color }: { data: Challenge[]; color: 'green1' | 'yellow' }) {
  const progressRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {data.map((challenge) => {
        return (
          <div className={styles.gap}>
            <Card variant={color}>
              <div className={styles.container}>
                <div className={styles.top}>
                  <img src={challenge.imgUrl} />
                  <div className={styles.introduce}>
                    <p className={styles.name}>{challenge.name}</p>
                    <p className={styles.description}>{challenge.description}</p>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <div className={styles.progress} ref={progressRef}>
                    <div className={styles.percentBar} data-color={color} style={{ width: `${challenge.progress}` }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </>
  );
}
