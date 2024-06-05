import { useContext } from 'react';
import clsx from 'clsx';
import s from './Day.module.css';
import { appСontext } from '../../../context/context';
import { DayType, EmptyDayType } from '../Calendar/Calendar';

// const сolors = ['#5463c0', '#a7bb40', '#44a6b0', '#f6734b', '#58a65a'];

type DayProps = EmptyDayType | DayType;

const Day = (day: DayProps) => {
  //
  const { setCurrentDate, setIsModalOpen } = useContext(appСontext);

  // клик по дню месяца
  const handleDateClick = (date: string) => {
    setCurrentDate(date);
    setIsModalOpen(true);
  };

  return day.isEmpty ? (
    <div className={clsx(s.emptyDay)}></div>
  ) : (
    <div
      className={s.day}
      onClick={() => handleDateClick(day.сlickDate.toLocaleDateString('ru-RU'))}
    >
      <p
        className={clsx(s.dayNumber, {
          [s.today]: day.isToday,
          [s.holiday]: day.isHoliday,
        })}
      >
        {day.date}
      </p>
      <div className={s.dayTasks}>
        {day.tasksForDay.slice(0, 2).map((el) => {
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
        {day.tasksForDay.length > 2 && <p className={s.more}>more...</p>}
      </div>
      {day.tasksForDay.length > 0 && <p className={s.hidden}>more...</p>}
    </div>
  );
};

export default Day;
