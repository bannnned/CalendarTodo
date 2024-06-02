import React, { useEffect, useState } from 'react';
import s from './Todo.module.css';
import { type Task } from '../CalendarTodo/type';

const Todo = ({ currentDate, setIsModalOpen, setTasks }) => {
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
      setTasksForDay([...tasksForDay, newTask]);
      setInput('');
      // Сохраняем задачи в localStorage
      localStorage.setItem(
        currentDate,
        JSON.stringify([...tasksForDay, newTask])
      );
      // Обновляем общий список задач
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } else {
      alert('Поле не может быть пустым');
    }
  };

  // удалить задачу
  const handleDelTask = (id) => {
    const delTasks = tasksForDay.filter((task) => task.id !== id);
    setTasksForDay(delTasks);
    // перезаписываем с новыми данными
    localStorage.setItem(currentDate, JSON.stringify(delTasks));
    // обновляем общее состояние
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    // Получаем задачи из localStorage на выбранную дату
    const localStorageTasks = localStorage.getItem(currentDate);
    const allTasks = localStorageTasks ? JSON.parse(localStorageTasks) : [];
    setTasksForDay(allTasks);
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
      <button onClick={handleAddTask}>Добавить</button> //
      <ul>
        {tasksForDay.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleDelTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
