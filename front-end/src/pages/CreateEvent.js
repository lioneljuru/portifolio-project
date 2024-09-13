import React, { useState, useContext } from "react";
import { EventContext } from "../context/EventContext";
import '../styles/CreateEvent.css';

function CreateEvent() {
  const { createEvent } = useContext(EventContext);
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: ''
  })

  const handleInputChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent(eventData); // Call the createEvent function from context to add the event
    setEventData({
      name: '',
      date: '',
      time: '',
      location: '',
      description: ''
    }); // Clear the form after submission
  };

  return (
    <div className="event-form-container">
      <h2 className="createEventTitle">Create Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <label htmlFor='name'>Event Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Event Name"
          autoComplete="name"
          value={eventData.name}
          onChange={handleInputChange}
        />

        <label htmlFor='date'>Date</label>
        <input
          id="date"
          type="date"
          name="date"
          autoComplete="off"
          value={eventData.date}
          onChange={handleInputChange}
        />

        <label htmlFor='time'>Time</label>
        <input
          id="time"
          type="time"
          name="time"
          autoComplete="off"
          value={eventData.time}
          onChange={handleInputChange}
        />

        <label htmlFor='location'>Location</label>
        <input
          id="location"
          type="text"
          name="location"
          placeholder="Location"
          autoComplete="location"
          value={eventData.location}
          onChange={handleInputChange}
        />

        <label htmlFor='description'>Description</label>
        <textarea
          rows={5}
          id="description"
          name="description"
          placeholder="Description"
          autoComplete="description"
          value={eventData.description}
          onChange={handleInputChange}>
        </textarea>

        <button className="createEventBtn" type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;