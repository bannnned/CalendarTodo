import { useEffect, useState } from 'react';
import Todo from '../Todo/Todo';
import Calendar from '../Calendar/Calendar';
import { type Task } from './type';

const CalendarTodo = (): JSX.Element => {
  // выбранная даты для отрисовки туду
  const [currentDate, setCurrentDate] = useState(null);
  // модалка
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Состояние для всех задач
  const [tasks, setTasks] = useState<Task[]>([]);

  // выбор даты
  const handleDateClick = (date): void => {
    setCurrentDate(date);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // получаем все из локалсторидж
    const keys = Object.keys(localStorage);
    const allTasks = [];
    keys.forEach((key) => {
      const tasks = JSON.parse(localStorage.getItem(key));
      allTasks.push(...tasks);
    });
    setTasks(allTasks);
  }, []);
  return (
    <>
      <Calendar handleDateClick={handleDateClick} tasks={tasks} />
      {isModalOpen && (
        <Todo
          currentDate={currentDate}
          setIsModalOpen={setIsModalOpen}
          setTasks={setTasks}
        />
      )}
    </>
  );
};

export default CalendarTodo;
