import { IoCloseOutline } from 'react-icons/io5';
import { RiErrorWarningLine } from 'react-icons/ri';
import { RiInformationLine } from 'react-icons/ri';
import { RiCheckboxCircleLine } from 'react-icons/ri';

import alert from '../../styles/components/common/alert.module.scss';
import { PropsWithChildren } from 'react';
type Props = {
  variant: 'error' | 'info' | 'success';
};
export function Alert({ variant, children }: PropsWithChildren<Props>) {
  return (
    <div className={`${alert.container} ${alert[variant]}`}>
      <div className={alert.icon}>
        {variant === 'error' && <RiErrorWarningLine size={'100%'} />}
        {variant === 'info' && <RiInformationLine size={'100%'} />}
        {variant === 'success' && <RiCheckboxCircleLine size={'100%'} />}
      </div>
      <div className={alert.text}>{children}</div>
      <div className={alert.close}>
        <IoCloseOutline size={'100%'} />
      </div>
    </div>
  );
}
