import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import CreateAndEditEvent from '../components/CreateAndEditEvent';
import '../styles/Profile.css';

const Profile = () => {
  const { eventData, createEvent, updateEvent, deleteEvent } = useContext(EventContext);
  const [isCreating, setIsCreating] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingEvent(null);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsCreating(true);
  };

  const handleDelete = (eventId) => {
    deleteEvent(eventId);
  };

  const handleSubmit = (event) => {
    if (editingEvent) {
      updateEvent(event);
    } else {
      createEvent(event);
    }
    setIsCreating(false);
    setEditingEvent(null);
  };

  const handleClose = () => {
    setIsCreating(false);
    setEditingEvent(null);
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="profile">
      <h2>My Events</h2>
      <button className="createBtn" onClick={handleCreate}>Create Event</button>
      {isCreating && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <CreateAndEditEvent
              isEditMode={!!editingEvent}
              event={editingEvent}
              onSubmit={handleSubmit}
              onCancel={handleClose}
              onDelete={() => handleDelete(editingEvent.id)}
            />
          </div>
        </div>
      )}
      <ul className="event-list">
        {eventData.length > 0 ? (
          eventData.map((event, index) => (
            <li key={event.id ? event.id : index} className="event-item">
              <h3>{event.title}</h3>
              <p>{formatDateTime(event.start)} - {formatDateTime(event.end)}</p>
              <p>Location: {event.location}</p>
              <p>{event.description}</p>
              <p>Invited Users:</p>
              <ul className="invited-users">
                {event.invitedUsers.map((user, userIndex) => (
                  <li key={userIndex}>{user}</li>
                ))}
              </ul>
              <button className="editBtn" onClick={() => handleEdit(event)}>Edit</button>
              <button className="deleteBtn" onClick={() => handleDelete(event.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No events available. Enjoy the Silence</p>
        )}
      </ul>
    </div>
  );
};

export default Profile;