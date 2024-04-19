import '../main.style.scss';

interface UserList {
  userId: string;
  rank: string;
  userProfileImg: string;
  userNickname: string;
  userScore: string;
}

const MOCKUP_USER: UserList[] = [
  { userId: '1', rank: '1', userProfileImg: '', userNickname: '우람찬 바위', userScore: '123214' },
  { userId: '2', rank: '2', userProfileImg: '', userNickname: '설악산 날다람쥐', userScore: '123214' },
  { userId: '3', rank: '3', userProfileImg: '', userNickname: '해맑은 고라니', userScore: '123214' },
  { userId: '4', rank: '4', userProfileImg: '', userNickname: '바다 거북이', userScore: '123214' },
  { userId: '5', rank: '5', userProfileImg: '', userNickname: '토끼와 엘리스', userScore: '123214' },
];
export default function RankList() {
  return (
    <div className="rank-list-box">
      {MOCKUP_USER.map((user) => (
        <div id={`${user.userId}`} className="rank-item-wrapper">
          <div className="user-rank">{user.rank}</div>
          <div className="profile-img-wrapper">
            <div className="user-profile-img">{user.userProfileImg}</div>
          </div>
          <div className="user-nickname">{user.userNickname}</div>
          <div className="user-score">{user.userScore}</div>
        </div>
      ))}
    </div>
  );
}
