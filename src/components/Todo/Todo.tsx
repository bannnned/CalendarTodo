import { useContext, useEffect, useState } from 'react';
import s from './Todo.module.css';
import { type Task } from '../type';
import { appСontext } from '../../context/context';

const Todo = () => {
  // выбранная дата, открытие/закрытие модалки
  const { currentDate, setIsModalOpen, dispatch } = useContext(appСontext);

  // Состояние для задач текущего дня
  const [tasksForDay, setTasksForDay] = useState<Task[]>([]);

  const [input, setInput] = useState('');

  // добавить задачу
  const handleAddTask = () => {
    // валидация
    if (input.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: input.trim(),
        date: currentDate,
      };
      setTasksForDay((prevTasks) => [...prevTasks, newTask]);
      setInput('');
      // Обновляем общий список задач
      dispatch({ type: 'ADD_TASK', payload: newTask });
    } else {
      alert('Поле не может быть пустым');
    }
  };

  // удалить задачу
  const handleDelTask = (id: number) => {
    const delTasks = tasksForDay.filter((task) => task.id !== id);
    setTasksForDay(delTasks);
    // обновляем общее состояние
    dispatch({ type: 'DEL_TASK', payload: id });
  };

  useEffect(() => {
    // Получаем задачи из localStorage на выбранную дату
    const localStorageTasks = localStorage.getItem(currentDate);
    const allTasks = localStorageTasks ? JSON.parse(localStorageTasks) : [];
    setTasksForDay(allTasks);
  }, [currentDate]);

  // перезаписываем с новыми данными
  useEffect(() => {
    localStorage.setItem(currentDate, JSON.stringify(tasksForDay));
  }, [tasksForDay]);

  return (
    <div className={s.modal}>
      <button onClick={(prev) => setIsModalOpen(!prev)} className={s.btnClose}>
        &lsaquo;
      </button>
      <h2 className={s.modalTitle}>Задачи на {currentDate}</h2>
      <div className={s.modalHeader}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTask} className={s.btnAdd}>
          Добавить
        </button>
      </div>
      <ul className={s.modalTasks}>
        {tasksForDay.map((task) => (
          <li key={task.id} className={s.modalTask}>
            {task.text}
            <button onClick={() => handleDelTask(task.id)} className={s.btnDel}>
              Х
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
