import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../../public/images/logo.svg";
import styles from "../../styles/components/common/navigation.module.scss";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        햄버거바
      </button>
      <ul className={isOpen == true ? styles.navOpen : styles.navClose}>
        <li>
          <Link to="/">
            <img src={logo} />
          </Link>
        </li>
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
    </nav>
  );
}
