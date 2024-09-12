import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';

function Home() {
  const { eventData } = useContext(EventContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEvents = eventData.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <h2>Upcoming Events</h2>
      <input id='searchEvent' name='searchEvent' type="text" placeholder="Search Events" value={searchQuery} onChange={handleSearch} />
      <ul>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <li key={event.id ? event.id : index}>
              <h3>{event.name}</h3>
              <p>{event.date} at {event.time}</p>
              <p>Location: {event.location}</p>
              <p>{event.description}</p>
            </li>
          ))
        ) : (
          <p>No events available</p>
        )}
      </ul>
    </div>
  );
}

export default Home;
