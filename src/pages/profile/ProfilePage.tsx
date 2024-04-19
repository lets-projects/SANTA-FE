import styles from './profile.module.scss';

interface User {
  userId: number;
  nickname: string;
  img: string;
  rank?: number;
}

const USER: User = {
  userId: 23,
  nickname: '산악대장',
  img: 'https://cdn.pixabay.com/photo/2022/08/05/05/59/korea-7366036_1280.jpg',
  rank: 1256,
};

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <img src={USER.img} />
      <img />
    </div>
  );
}
