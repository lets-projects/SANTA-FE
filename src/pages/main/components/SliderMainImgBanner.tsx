import styles from '../mainPage.module.scss';
import { useState, useEffect } from 'react';

const MOCKUP: SliderItems[] = [
  { img: 'img1', title: '가을 전경이 아름다운 설악산', subtitle: '아주 나이스~' },
  { img: 'img1', title: '가을 전경이 아름다운 설악산', subtitle: '아주 나이스~' },
  { img: 'img1', title: '가을 전경이 아름다운 설악산', subtitle: '아주 나이스~' },
];

interface SliderItems {
  img: string;
  title: string;
  subtitle: string;
}

const SliderMainImgBanner = () => {
  // todo api연결
  const getSliderItemList = MOCKUP;

  const [SliderItemList, setSliderItemList] = useState(getSliderItemList);
  const [scrollState, setScrollState] = useState(0);

  let count = 0;

  const nextButton = () => {
    count = SliderItemList.length - 1 === count ? 0 : count + 1;
    setScrollState(parseInt('-' + count * 100 + 'vw'));
  };
  useEffect(() => {}, []);
  // 넘어오는 메인 이미지들을 map으로 반환
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.sliderButtonWrapper}>
        <div className={styles.preButton}>이전</div>
        <div className={styles.nextButton}>다음</div>
      </div>
      <ul className={styles.sliderBox}>
        {MOCKUP.map((item) => (
          <li className={styles.slideItem}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export { SliderMainImgBanner };
