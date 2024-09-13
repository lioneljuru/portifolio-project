import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

export default function CalendarPage() {
  const [events, setEvents] = useState([
    { title: 'Event 1', start: '2024-09-01', end: '2024-09-03' },
    { title: 'Event 2', start: '2024-09-07', end: '2024-09-10' },
    { title: 'Event 3', start: '2024-09-18', end: '2024-09-20' },
    { title: 'Event 4', start: '2024-09-24', end: '2024-09-27' },
  ]);

  /* const handleDateClick = (info) => {
     // Prompt user to add a new event or  Example of clicking a date to add an event
     const title = prompt('Event Title:');
     if (title) {
       setEvents([...events, { title, date: info.dateStr }]);
     }
   };
 
   const handleEventDrop = (info) => {
     // Update the event date when dropped
     const updatedEvents = events.map((event) => {
       if (event.title === info.event.title) {
         return { ...event, date: info.event.startStr };
       }
       return event;
     });
     setEvents(updatedEvents);
   };
 
   const handleEventClick = (info) => {
     // Delete event when clicked
     const updatedEvents = events.filter((event) => event.title !== info.event.title);
     setEvents(updatedEvents);
   };*/

  const handleDateClick = (info) => {
    alert('Date clicked: ' + info.dateStr);
  };

  const handleEventClick = (info) => {
    alert('Event clicked: ' + info.event.title);
  };

  const handleEventDrop = (info) => {
    alert(info.event.title + ' was dropped on ' + info.event.start.toISOString());
  };

  return (
    <div className='calendar'>
      <h1>My Planning</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]} //  Add desired plugins
        initialView='dayGridMonth' // Default view (e.g., month view)
        events={events} // Events to display
        dateClick={handleDateClick} // Handle clicks on dates
        eventClick={handleEventClick} // Handle clicks on events
        eventDrop={handleEventDrop} // Handle event drops
        editable={true} // Allows drag and drop
        selectable={true} // Allows selection of dates
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}  // Add buttons to change view
      />
    </div>
  );
}