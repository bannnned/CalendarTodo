import React from 'react';
import clsx from 'clsx';
import s from './Day.module.css';
import { Task } from '../../type';

type DayProps = {
  сlickDate: Date;
  isToday: boolean;
  tasksForDay: Task[];
  tasksToShow: Task[];
  handleDateClick: (value: string) => void;
  index: number;
  isHoliday: boolean;
};

// const сolors = ['#5463c0', '#a7bb40', '#44a6b0', '#f6734b', '#58a65a'];

const MemoizedDay = React.memo(function Day({
  сlickDate,
  isToday,
  tasksForDay,
  tasksToShow,
  handleDateClick,
  index,
  isHoliday,
}: DayProps) {
  return (
    <div
      className={s.day}
      onClick={() => handleDateClick(сlickDate.toLocaleDateString('ru-RU'))}
    >
      <p
        className={clsx(s.dayNumber, {
          [s.today]: isToday,
          [s.holiday]: isHoliday,
        })}
      >
        {index}
      </p>
      <div className={s.dayTasks}>
        {tasksToShow.map((el) => {
          // Выбор случайного цвета из массива
          // const randomColor = сolors[Math.floor(Math.random() * сolors.length)];
          return (
            <p
              key={el.id}
              className={s.dayTask}
              style={{ backgroundColor: '#5463c0', borderRadius: '8px' }}
            >
              {el.text}
            </p>
          );
        })}
        {tasksForDay.length > 2 && <p className={s.more}>more...</p>}
      </div>
      {tasksForDay.length > 0 && <p className={s.hidden}>more...</p>}
    </div>
  );
});

export default MemoizedDay;
