import { Link } from 'react-router-dom';
import { SearchInput } from '../../components/common/Input';
import styles from '../../styles/gathering/gatheringSearch.module.scss';
import { IoChevronBack } from 'react-icons/io5';
import { Chips } from '../../components/common/Chips';
import { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

export function GatheringSearchPage() {
  const [searchKeywords, setSearchKeywords] = useState(['검색1', '검색어2', '검색3', '4', '5', '6']);
  const [isDeleted, setIsDeleted] = useState(false);
  function deleteSearchKeyword(index: number) {
    const newArr = [...searchKeywords.slice(0, index), ...searchKeywords.slice(index + 1)];
    console.log(index, newArr, searchKeywords[index]);
    setSearchKeywords(newArr);
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerRow}>
        <Link className={styles.backBtn} to="/gathering">
          <IoChevronBack color="#498428" size={'2rem'} />
        </Link>
        <SearchInput placeholder="모임을 검색해보세요" />
      </div>
      <div className={styles.containerCol}>
        <div className={styles.containerRow}>
          <div className={styles.subtitle1}>최근검색어</div>
          <div
            className={`${styles.subtitle2} ${styles.pointer}`}
            onClick={() => {
              setIsDeleted(!isDeleted);
            }}
          >
            삭제하기
          </div>
        </div>
        <div className={`${styles.containerRow} ${styles.wrap}`}>
          {searchKeywords.map((item, index) => (
            <div key={index} className={styles.chipContainer}>
              <Chips variant="green1">
                <div className={styles.chipContainer}>
                  {item}
                  {isDeleted ? (
                    ''
                  ) : (
                    <IoCloseOutline className={styles.closeBtn} onClick={() => deleteSearchKeyword(index)} />
                  )}
                </div>
              </Chips>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.containerCol}>
        <div className={styles.containerRow}>
          <div className={styles.subtitle1}>추천검색어</div>
        </div>
        <div className={`${styles.containerRow} ${styles.wrap}`}>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
          <Chips variant="green2">dkdk</Chips>
        </div>
      </div>
    </div>
  );
}
