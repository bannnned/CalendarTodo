import { useEffect, useState } from 'react';
import s from './Calendar.module.css';
import EmptyDay from '../EmptyDay/EmptyDay';
import Day from '../Day/Day';
import { type Task } from '../../type';

type CalendarProps = {
  handleDateClick: (value: string) => void;
  tasks: Task[];
};

const Calendar = ({ handleDateClick, tasks }: CalendarProps): JSX.Element => {
  // выделить сегодня
  const today = new Date();
  // состояние на текущую дату
  const [date, setDate] = useState(new Date());
  // Состояние для хранения информации о праздничных днях
  const [holidays, setHolidays] = useState<number[]>([]);

  // Функция для загрузки информации о праздничных днях для заданного месяца
  const dayOffApi = async (year: number, month: number) => {
    try {
      const response = await fetch(
        `https://isdayoff.ru/api/getdata?year=${year}&month=${month}&cc=ru`
      );
      const data = await response.text();
      //
      const dayOff = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i] === '1') {
          // Если цифра равна 1, это нерабочий день
          dayOff.push(i);
        }
      }
      setHolidays(dayOff);
    } catch (error) {
      console.error('УПС, не узнаем когда отдыхать');
    }
  };

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
      const сlickDate = new Date(date.getFullYear(), date.getMonth(), i);

      // выделяем сегоднящний день
      let isToday = false;
      if (сlickDate.toDateString() === today.toDateString()) {
        isToday = true;
      }
      // выделяем выходные
      let isHoliday = false;
      if (holidays && holidays.includes(i - 1)) {
        isHoliday = true;
      }

      //массив с задачами для одного текущего дня
      const tasksForDay = tasks.filter(
        (el) => el.date === сlickDate.toLocaleDateString('ru-RU')
      );
      const tasksToShow = tasksForDay.slice(0, 2);

      days.push(
        <Day
          key={`day-${i}`}
          сlickDate={сlickDate}
          isToday={isToday}
          tasksForDay={tasksForDay}
          tasksToShow={tasksToShow}
          handleDateClick={handleDateClick}
          index={i}
          isHoliday={isHoliday}
        />
      );
    }

    return days;
  };

  // получаем празднечные дни
  useEffect(() => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    dayOffApi(currentYear, currentMonth);
  }, [date]);

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
