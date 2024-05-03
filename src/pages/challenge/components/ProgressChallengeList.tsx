import { useRef } from 'react';

import { Card } from '/src/components/common/Card';
import styles from './ChallengeList.module.scss';

interface ProgressChallengeData {
  completionDate: null | string;
  progress: number;
  challenge: {
    name: number;
    description: string;
    image: string;
    clearStandard: number;
  };
}

export default function ProgressChallengeList({
  Challengedata,
  color,
}: {
  Challengedata: ProgressChallengeData[];
  color: 'green2' | 'yellow';
}) {
  const progressRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {Challengedata.map((challenge) => {
        return (
          <div key={challenge.challenge.name} className={styles.gap}>
            <Card variant={color}>
              <div className={styles.container}>
                <div className={styles.top}>
                  <img src={challenge.challenge.image} />
                  <div className={styles.introduce}>
                    <p className={styles.name}>{challenge.challenge.name}</p>
                    <p className={styles.description}>{challenge.challenge.description}</p>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <div className={styles.progress} ref={progressRef}>
                    <div
                      className={styles.percentBar}
                      data-color={color}
                      style={{ width: `${(challenge.progress / challenge.challenge.clearStandard) * 100}` }}
                    />
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
