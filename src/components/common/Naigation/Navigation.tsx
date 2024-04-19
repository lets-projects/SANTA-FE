import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';

import logo from '../../../../public/images/logo.svg';
import styles from '../../../styles/components/common/navigation.module.scss';
import UserProfile from './UserProfile';

const NAVLIST = [
  { title: '내 프로필', path: '/profile' },
  { title: '랭킹', path: '/rank' },
  { title: '진행중인 챌린지', path: '/challenge' },
  { title: '내 모임 바로가기', path: '/myclub' },
  { title: '실시간 채팅', path: '/livechat' },
  { title: '모임 만들기', path: '/createclub' },
  { title: '설정', path: '/setting' },
];

export default function Navigation({ back }: { back: boolean }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const outside = useRef<any>();

  useEffect(() => {
    document.addEventListener('mousedown', handlerOutside);
    return () => {
      document.removeEventListener('mousedown', handlerOutside);
    };
  });
  const handlerOutside = (e: MouseEvent) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const HambergerBtn = () => {
    return (
      <button onClick={onClick} className={styles.btn}>
        <GiHamburgerMenu size="30" color="white" />
      </button>
    );
  };

  const BackBtn = () => {
    return (
      <button
        onClick={() => {
          navigate(-1);
        }}
        className={styles.btn}
      >
        <IoIosArrowBack size="30" color="white" />
      </button>
    );
  };

  return (
    <header className={styles.header}>
      <nav className={isOpen ? styles.darkBg : ''}>
        {back ? <BackBtn /> : <HambergerBtn />}
        <div className={isOpen ? styles.navOpen : styles.navClose} ref={outside}>
          <Link to="/" onClick={onClick}>
            <img src={logo} className={styles.logo} />
          </Link>
          <div className={styles.navContainer}>
            <div className={styles.userBox}>
              <UserProfile />
            </div>
            <div className={styles.linkBox}>
              <ul>
                {NAVLIST.map((item) => (
                  <li>
                    <Link to={item.path} onClick={onClick}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
