import { useContext, useState } from 'react';
import s from './Todo.module.css';
import { appСontext } from '../../context/context';
import useTasks from '../../hooks/useTasks';

const Todo = () => {

  // выбранная дата, открытие/закрытие модалки
  const { currentDate, setIsModalOpen, dispatch } = useContext(appСontext);

  //
  const [input, setInput] = useState('');

  // кастомный хук для добавления и удаления задач в текущем дне
  const { tasksForDay, handleAddTask, handleDelTask } = useTasks({
    currentDate,
    dispatch,
    input,
    setInput,
  });

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
