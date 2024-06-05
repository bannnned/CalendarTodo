import { Dispatch, useEffect, useState } from 'react';
import { Task } from '../components/type';
import { Action } from '../reducer/reducer';

type UseTasksProps = {
  currentDate: string;
  dispatch: Dispatch<Action>;
  input: string;
  setInput: Dispatch<React.SetStateAction<string>>;
};

type UseTasksReturn = {
  tasksForDay: Task[];
  handleAddTask: () => void;
  handleDelTask: (id: number) => void;
};

const useTasks = ({
  currentDate,
  dispatch,
  input,
  setInput,
}: UseTasksProps): UseTasksReturn => {
  // Состояние для задач текущего дня
  const [tasksForDay, setTasksForDay] = useState<Task[]>([]);

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

  return { tasksForDay, handleAddTask, handleDelTask };
};

export default useTasks;
