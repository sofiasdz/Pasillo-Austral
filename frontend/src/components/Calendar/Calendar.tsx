import React from 'react';
import './Calendar.css';
import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { MonthEvents, type Event } from '../MonthEvents/MonthEvents';

export interface CalendarProps {
  month: string;
  year: number;
  weeks: Array<Array<{ day: number; isActive?: boolean; hasEvents?: number }>>;
  weekDays: string[];
  events: Event[];
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  month,
  year,
  weeks,
  weekDays,
  events,
  onPreviousMonth,
  onNextMonth,
}) => {
  return (
    <div className="calendar">
      <CalendarMonth
        month={month}
        year={year}
        weeks={weeks}
        weekDays={weekDays}
        onPreviousMonth={onPreviousMonth}
        onNextMonth={onNextMonth}
      />
      <MonthEvents events={events} />
    </div>
  );
};

export default Calendar;

