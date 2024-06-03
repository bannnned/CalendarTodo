import { useState } from 'react';
import s from './Calendar.module.css';
import EmptyDay from '../EmptyDay/EmptyDay';
import Day from '../Day/Day';

const Calendar = ({ handleDateClick, tasks }): JSX.Element => {
  // выделить сегодня
  const today = new Date();
  // состояние на текущую дату
  const [date, setDate] = useState(new Date());

  // получае первое число прошлого мес
  const handlePrevMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  // получае первое число след мес
  const handleNextMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
    const days = [];

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // возвращать день недели для первого числа выбранного месяца (от 0-вс до 6-сб)

    const lastDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate(); // будет содержать количество дней в текущем месяце

    // заполняем календарь
    // Добавляем пустые ячейки для первых дней недели
    for (let i = 0; i < firstDay - 1; i++) {
      days.push(<EmptyDay key={`empty-${i}`} />);
    }

    // Добавляем дни месяца
    for (let i = 1; i <= lastDate; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      // выделяем сегоднящний день
      let isToday = null;
      if (currentDate.toDateString() === today.toDateString()) {
        isToday = true;
      }

      //массив с задачами для одного текущего дня
      const tasksForDay = tasks.filter(
        (el) => el.date === currentDate.toLocaleDateString('ru-RU')
      );
      const tasksToShow = tasksForDay.slice(0, 2);

      days.push(
        <Day
          key={`day-${i}`}
          currentDate={currentDate}
          isToday={isToday}
          tasksForDay={tasksForDay}
          tasksToShow={tasksToShow}
          handleDateClick={handleDateClick}
          index={i}
        />
      );
    }

    return days;
  };

  return (
    <div className={s.calendar}>
      <div className={s.calendarMonth}>
        <button onClick={handlePrevMonth} className={s.monthNavButton}>
          &lsaquo;
        </button>
        <span className={s.monthLabel}>
          {date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={handleNextMonth} className={s.monthNavButton}>
          &rsaquo;
        </button>
      </div>
      <div className={s.calendarWeekDays}>
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
          <div key={index} className={s.weekDay}>
            {day}
          </div>
        ))}
      </div>
      <div className={s.calendarDays}>{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
