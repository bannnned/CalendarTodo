import React, { useState } from 'react';
import Todo from '../Todo/Todo';
import Calendar from '../Calendar/Calendar';

const CalendarTodo = () => {

  // выбранная даты
  const [currentDate, setCurrentDate] = useState(null);
  // модалка
  const [isModalOpen, setIsModalOpen] = useState(false);

  // выбор даты
  const handleDateClick = (date) => {
    setCurrentDate(date);
    setIsModalOpen(true);
  };

  return (
    <>
      <Calendar handleDateClick={handleDateClick} />
      {isModalOpen && (
        <Todo currentDate={currentDate} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};

export default CalendarTodo;
