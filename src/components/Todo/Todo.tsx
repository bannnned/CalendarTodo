import React, { useEffect, useState } from 'react';
import s from './Todo.module.css';

type Task = { id: number; text: string };

const Todo = ({ currentDate, setIsModalOpen }) => {
  // массив с задачами
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    // валидация
    if (input.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: input.trim(),
      };
      setTasks([...tasks, newTask]);
      setInput('');
      // Сохраняем задачи в localStorage
      localStorage.setItem(currentDate, JSON.stringify([...tasks, newTask]));
    } else {
      alert('Поле не может быть пустым');
    }
  };

  useEffect(() => {
    // Получаем задачи из localStorage на выбранную дату
    const localStorageTasks = localStorage.getItem(currentDate);
    const allTasks = localStorageTasks ? JSON.parse(localStorageTasks) : [];
    setTasks(allTasks);
  }, [currentDate]);

  return (
    <div className={s.modal}>
      <button onClick={(prev) => setIsModalOpen(!prev)}>Закрыть</button>
      <h2>Задачи на {currentDate}</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAddTask}>Добавить</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
