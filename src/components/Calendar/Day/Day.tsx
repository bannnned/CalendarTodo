import clsx from 'clsx';
import s from './Day.module.css';

const сolors = ['#5463c0', '#a7bb40', '#44a6b0', '#f6734b', '#58a65a'];

const Day = ({
  currentDate,
  isToday,
  tasksForDay,
  tasksToShow,
  handleDateClick,
  index,
}) => {
  return (
    <div
      className={s.day}
      onClick={() => handleDateClick(currentDate.toLocaleDateString('ru-RU'))}
    >
      <p className={clsx(s.dayNumber, { [s.today]: isToday })}>{index}</p>
      <div className={s.dayTasks}>
        {tasksToShow.map((el) => {
          // Выбор случайного цвета из массива
          const randomColor = сolors[Math.floor(Math.random() * сolors.length)];
          return (
            <p
              key={el.id}
              className={s.dayTask}
              style={{ backgroundColor: randomColor, borderRadius: '8px' }}
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
};

export default Day;
