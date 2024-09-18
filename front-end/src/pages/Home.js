import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import '../styles/Home.css';

function Home() {
  const { eventData } = useContext(EventContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEvents = eventData.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="home">
      <h2>Upcoming Events</h2>
      <input id='searchEvent' name='searchEvent' type="text" placeholder="Search Events" value={searchQuery} onChange={handleSearch} className='searchBtn' />
      <ul>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <li key={event.id ? event.id : index}>
              <h3>{event.title}</h3>
              <p>Starts {formatDateTime(event.start)} at {formatDateTime(event.end)}</p>
              <p>Location: {event.location}</p>
              <p>{event.description}</p>
              <p>Invited Users:</p>
              <ul className="invited-users">
                {event.invitedUsers.map((user, userIndex) => (
                  <li key={userIndex}>{user}</li>
                ))}
              </ul>
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
