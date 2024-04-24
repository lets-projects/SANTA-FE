import styles from '../../styles/components/common/input.module.scss';
import { IoSearch } from 'react-icons/io5';
type Props = {
  variant: 'outline-green3' | 'outline-gray' | 'underline';
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // 수정
  value?: string;
  placeholder?: string;
};

export const Input = ({ variant, onChange, value, placeholder }: Props) => {
  return (
    <input
      className={`${styles.input} ${styles[variant]}`}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    ></input>
  );
};

type searchProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // 수정
  value?: string;
  placeholder?: string;
};
export const SearchInput = ({ onChange, value, placeholder }: searchProps) => {
  return (
    <div className="search-input-container">
      <IoSearch color="#498428" />
      <input className="search-input" onChange={onChange} value={value} placeholder={placeholder}></input>
    </div>
  );
};
