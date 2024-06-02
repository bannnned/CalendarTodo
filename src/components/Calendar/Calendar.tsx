import { useState } from 'react';
import clsx from 'clsx';
import s from './Calendar.module.css';

const Calendar = ({ handleDateClick }) => {
  // состояние на текущий месяц
  const [date, setDate] = useState(new Date());

  const handlePrevMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1) // получае первое число прошлого мес
    );
  };

  const handleNextMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1) // получае первое число след мес
    );
  };

  const renderCalendar = () => {
    const days = [];

    // возвращать день недели для первого числа выбранного месяца (от 0-вс до 6-сб)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    // будет содержать количество дней в текущем месяце
    const lastDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    // заполняем календарь
    // Добавляем пустые ячейки для первых дней недели
    for (let i = 0; i < firstDay - 1; i++) {
      days.push(
        <div key={`empty-${i}`} className={clsx(s.day, s.empty)}></div>
      );
    }

    // Добавляем дни месяца
    for (let i = 1; i <= lastDate; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      days.push(
        <div
          key={`day-${i}`}
          className={clsx(s.day, s.date)}
          onClick={() =>
            handleDateClick(currentDate.toLocaleDateString('ru-RU'))
          }
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={s.calendar}>
      <div className={s.month}>
        <button onClick={handlePrevMonth}>Предыдущий месяц</button>
        <span>
          {date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={handleNextMonth}>Следующий месяц</button>
      </div>
      <div className={s.days}>
        <div className={s.day}>Пн</div>
        <div className={s.day}>Вт</div>
        <div className={s.day}>Ср</div>
        <div className={s.day}>Чт</div>
        <div className={s.day}>Пт</div>
        <div className={s.day}>Сб</div>
        <div className={s.day}>Вс</div>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
