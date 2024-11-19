import React, { useState } from "react";

export default function Calendar({ onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const weekDays = ["D", "S", "T", "Q", "QU", "S", "S"];

  const handleDateSelect = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
    onDateSelect(date); // Notifica o componente pai
  };

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        day === selectedDate.getDate() &&
        currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getFullYear() === selectedDate.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
            isSelected ? "bg-red-400 text-white" : "hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const changeMonth = (increment) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)}>{"<"}</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)}>{">"}</button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div
            key={day}
            className="w-8 h-8 flex items-center justify-center font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
}
