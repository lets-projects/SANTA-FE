import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import logo from "../../../../public/images/logo.svg";
import styles from "../../../styles/components/common/navigation.module.scss";
import UserProfile from "./UserProfile";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const outside = useRef<any>();

  useEffect(() => {
    document.addEventListener("mousedown", handlerOutsie);
    return () => {
      document.removeEventListener("mousedown", handlerOutsie);
    };
  });
  const handlerOutsie = (e: any) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={isOpen ? styles.darkBg : ""}>
        <button
          onClick={(e) => {
            setIsOpen(!isOpen);
            e.preventDefault();
          }}
          className={styles.hambergerBtn}
        >
          <GiHamburgerMenu size="30" color="white" />
        </button>
        <div
          className={isOpen ? styles.navOpen : styles.navClose}
          ref={outside}
        >
          <Link to="/">
            <img src={logo} className={styles.logo} />
          </Link>
          <div className={styles.navContainer}>
            <div className={styles.userBox}>
              <UserProfile />
            </div>
            <div className={styles.linkBox}>
              <ul>
                <li>
                  <Link to="/porfile">내 프로필</Link>
                </li>
                <li>
                  <Link to="/rank">랭킹</Link>
                </li>
                <li>
                  <Link to="/challenge">진행 중인 챌린지</Link>
                </li>
                <li>
                  <Link to="/myclub">내 모임 바로가기</Link>
                </li>
                <li>
                  <Link to="/livechat">실시간 채팅</Link>
                </li>
                <li>
                  <Link to="#">모임 만들기</Link>
                </li>
                <li>
                  <Link to="/setting">설정</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
