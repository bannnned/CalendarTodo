import { useEffect, useReducer, useState } from 'react';
import Todo from '../../components/Todo/Todo';
import Calendar from '../../components/Calendar/Calendar/Calendar';
import { type Task } from '../../components/type';
import s from './CalemdarTodo.module.css';

import { appСontext as AppContext } from '../../context/context';
import { init, reducer } from '../../reducer/reducer';

const CalendarTodo = (): JSX.Element => {
  // все задачи из локалсторидж
  const [state, dispatch] = useReducer(reducer, init);

  // выбранная даты для отрисовки туду
  const [currentDate, setCurrentDate] = useState('');
  // модалка
  const [isModalOpen, setIsModalOpen] = useState(false);


  
  useEffect(() => {
    // получаем все из локалсторидж
    const keys = Object.keys(localStorage);
    const allTasks: Task[] = [];
    keys.forEach((key) => {
      const storage = localStorage.getItem(key);
      if (storage) {
        const tasks = JSON.parse(storage);
        allTasks.push(...tasks);
      }
    });
    console.log(allTasks);
    dispatch({ type: 'LOAD_TASKS', payload: allTasks });
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        isModalOpen,
        setIsModalOpen,
        state,
        dispatch,
      }}
    >
      <div className={s.container}>
        {isModalOpen && <Todo />}
        <Calendar />
      </div>
    </AppContext.Provider>
  );
};

export default CalendarTodo;
