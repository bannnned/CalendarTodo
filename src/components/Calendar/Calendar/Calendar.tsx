import { useContext, useEffect, useState } from 'react';
import s from './Calendar.module.css';
import Day from '../Day/Day';
import { nanoid } from 'nanoid';

import { appСontext } from '../../../context/context';
import { fetchHolidays } from '../../../api/holidayApi';
import { Task } from '../../type';

export type EmptyDayType = {
  id: string;
  isEmpty: true;
};

export type DayType = {
  id: string;
  сlickDate: Date;
  isToday: boolean;
  tasksForDay: Task[];
  date: number;
  isHoliday: boolean;
  isEmpty: boolean;
};

const Calendar = (): JSX.Element => {
  //
  const { state } = useContext(appСontext);

  // состояние на текущую дату месяца
  const [date, setDate] = useState(new Date());
  // Состояние для хранения информации о праздничных днях
  const [holidays, setHolidays] = useState<number[]>([]);

  // выделить сегодня
  const today = new Date();

  // получаем первое число прошлого мес
  const handlePrevMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  // получаем первое число след мес
  const handleNextMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  // отрисовка календаря
  // возвращать день недели для первого числа выбранного месяца (от 0-вс до 6-сб)
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  // будет содержать количество дней в текущем месяце
  const lastDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  // заполняем календарь
  const days: (DayType | EmptyDayType)[] = [];

  // Добавляем пустые ячейки для первых дней недели
  for (let i = 0; i < firstDay - 1; i++) {
    const oneDay: EmptyDayType = {
      id: nanoid(4),
      isEmpty: true,
    };
    days.push(oneDay);
  }

  // Добавляем дни месяца
  for (let i = 1; i <= lastDate; i++) {
    const oneDay: DayType = {
      id: nanoid(4),
      isEmpty: false,
      date: i,
      сlickDate: new Date(date.getFullYear(), date.getMonth(), i),
      isToday: false,
      tasksForDay: [],
      isHoliday: holidays && holidays.includes(i - 1),
    };

    // выделяем сегоднящний день
    if (oneDay.сlickDate.toDateString() === today.toDateString()) {
      oneDay.isToday = true;
    }

    //массив с задачами для одного текущего дня
    oneDay.tasksForDay = state.tasks.filter(
      (el) => el.date === oneDay.сlickDate.toLocaleDateString('ru-RU')
    );

    days.push(oneDay);
  }

  // получаем празднечные дни
  useEffect(() => {
    const loadHolidays = async () => {
      const { year, month } = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      };
      const holidaysData = await fetchHolidays(year, month);
      setHolidays(holidaysData || []);
    };
    loadHolidays();
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
      <div className={s.calendarDays}>
        {days.map((day) => (
          <Day {...day} key={day.id} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
