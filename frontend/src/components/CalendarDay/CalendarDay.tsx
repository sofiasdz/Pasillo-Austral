import React from 'react';
import './CalendarDay.css';
import calendarDotSmall from '../../assets/calendar-dot-small.png';
import calendarDotBg from '../../assets/calendar-dot.png';

export interface CalendarDayProps {
  day: number | string;
  isActive?: boolean;
  hasEvents?: number; // Number of events (0-3 for dots)
}

export const CalendarDay: React.FC<CalendarDayProps> = ({ 
  day, 
  isActive = false,
  hasEvents = 0
}) => {
  const renderDots = () => {
    if (hasEvents === 0) return null;
    
    const dots = [];
    const positions = [
      { left: '8px', top: '29px' },
      { left: '17px', top: '29px' },
      { left: '12px', top: '31px' },
      { left: '2px', top: '30px' },
      { left: '22px', top: '30px' },
    ];
    
    for (let i = 0; i < Math.min(hasEvents, 3); i++) {
      dots.push(
        <img 
          key={i} 
          src={calendarDotSmall} 
          alt="" 
          className="calendar-day__dot"
          style={positions[i] || positions[0]}
        />
      );
    }
    return dots;
  };

  return (
    <div className={`calendar-day ${isActive ? 'calendar-day--active' : ''}`}>
      {isActive && (
        <div className="calendar-day__background">
          <img src={calendarDotBg} alt="" className="calendar-day__bg-dot" />
        </div>
      )}
      <div className="calendar-day__content">
        {typeof day === 'number' ? (
          <p className="calendar-day__number">{day}</p>
        ) : (
          <p className="calendar-day__text">{day}</p>
        )}
      </div>
      {renderDots()}
    </div>
  );
};

export default CalendarDay;
