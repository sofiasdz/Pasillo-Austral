import React from 'react';
import './MonthEvents.css';

export interface Event {
  date: string;
  title: string;
}

export interface MonthEventsProps {
  events: Event[];
}

export const MonthEvents: React.FC<MonthEventsProps> = ({ events }) => {
  return (
    <div className="month-events">
      <div className="month-events__header">
        <p className="month-events__title">Próximos Eventos</p>
      </div>
      <div className="month-events__list">
        {events.map((event, index) => (
          <div 
            key={index} 
            className={`month-events__item ${index < events.length - 1 ? 'month-events__item--bordered' : ''}`}
          >
            <div className="month-events__date">{event.date}</div>
            <div className="month-events__title-text">{event.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthEvents;

