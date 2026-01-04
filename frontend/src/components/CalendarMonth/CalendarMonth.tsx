import React from 'react';
import './CalendarMonth.css';
import { CalendarDay } from '../CalendarDay/CalendarDay';
import chevronUp from '../../assets/chevron-up.svg';

export interface CalendarMonthProps {
  month: string;
  year: number;
  weeks: Array<Array<{ day: number; isActive?: boolean; hasEvents?: number }>>;
  weekDays: string[];
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
}

export const CalendarMonth: React.FC<CalendarMonthProps> = ({
  month,
  year,
  weeks,
  weekDays,
  onPreviousMonth,
  onNextMonth,
}) => {
  return (
    <div className="calendar-month">
      <div className="calendar-month__header">
        <div className="calendar-month__title">
          <p className="calendar-month__title-text">{month} {year}</p>
        </div>
        <div className="calendar-month__controls">
          <button 
            className="calendar-month__control"
            onClick={onPreviousMonth}
            aria-label="Previous month"
          >
            <div className="calendar-month__control-icon calendar-month__control-icon--prev">
              <img src={chevronUp} alt="" className="calendar-month__chevron" />
            </div>
          </button>
          <button 
            className="calendar-month__control"
            onClick={onNextMonth}
            aria-label="Next month"
          >
            <div className="calendar-month__control-icon calendar-month__control-icon--next">
              <img src={chevronUp} alt="" className="calendar-month__chevron" />
            </div>
          </button>
        </div>
      </div>
      
      <div className="calendar-month__body">
        <div className="calendar-month__weekdays">
          {weekDays.map((day, index) => (
            <div key={index} className="calendar-month__weekday">
              <CalendarDay day={day} />
            </div>
          ))}
        </div>
        
        <div className="calendar-month__weeks">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="calendar-month__week">
              {week.map((dayData, dayIndex) => (
                <CalendarDay
                  key={dayIndex}
                  day={dayData.day}
                  isActive={dayData.isActive}
                  hasEvents={dayData.hasEvents}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarMonth;

