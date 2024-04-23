import styles from './ChallengePage.module.scss';
import { UserProfile_small } from '/src/components/common/UserProfile_small';
import ChallengeList from './components/ChallengeList';
import { useState } from 'react';

const CHALLENGE = [
  {
    name: '11111',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '영차! 올라가봅시다!!',
    progress: '10%',
  },
  {
    name: '22222',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '영차! 올라가봅시다!!',
    progress: '60%',
  },
  {
    name: '3333',
    imgUrl: 'https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_1280.jpg',
    description: '영차! 올라가봅시다!!',
    progress: '90%',
  },
];

const tabData = [
  { button: '진행중인 챌린지', data: CHALLENGE },
  { button: '시작 전 챌린지', data: CHALLENGE },
];

export default function ChallengePage() {
  const [openTab, setOpenTab] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <UserProfile_small name={'산악대'} />
        <button className={styles.myTrophyBtn}>나의 트로피 보러 가기</button>
      </div>
      <div className={styles.middle}>
        {tabData.map((item, index) => {
          return (
            <button
              className={styles.tabBtn}
              onClick={() => {
                setOpenTab(index);
              }}
            >
              {item.button}
            </button>
          );
        })}
      </div>

      <div className={styles.bottom}>
        <ChallengeList data={tabData[openTab].data} color={openTab == 0 ? 'green1' : 'yellow'} />
      </div>
    </div>
  );
}
