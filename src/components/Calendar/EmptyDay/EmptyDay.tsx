import clsx from 'clsx';
import s from './EmptyDay.module.css';

const EmptyDay = (): JSX.Element => {
  return <div className={clsx(s.emptyDay)}></div>;
};

export default EmptyDay;
