import { PropsWithChildren } from 'react';
import styles from '../../styles/components/common/button.module.scss';

type Props = {
  size: 'fixed' | 'large' | 'fluent';
  variant: 'rectangular' | 'rounded' | 'outlined' | 'outlined-icon';
  color: 'primary' | 'secondary' | 'disabled' | 'danger' | 'none';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset' | undefined;
};
interface DeleteBtnProps {
  onClick: () => void;
}

export const Button = ({ children, onClick, size, variant, color, type }: PropsWithChildren<Props>) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${styles[color]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export const DeleteBtn: React.FC<DeleteBtnProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.deleteBtn}>
      삭제
    </div>
  );
};

export const EditBtn: React.FC<DeleteBtnProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.editBtn}>
      수정
    </div>
  );
};
