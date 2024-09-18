import React, { useState, useEffect } from 'react';
import '../styles/CreateAndEditEvent.css';

const CreateAndEditEvent = ({ isEditMode, event, onSubmit, onCancel, onDelete }) => {
  // If editing, pre-fill the values with the event data
  const [title, setTitle] = useState(isEditMode && event ? event.title : '');
  const [start, setStart] = useState(isEditMode && event ? event.start : '');
  const [end, setEnd] = useState(isEditMode && event ? event.end : '');
  const [allDay, setAllDay] = useState(isEditMode && event ? event.allDay : false);
  const [isPriority, setIsPriority] = useState(isEditMode && event ? event.isPriority : false);
  const [location, setLocation] = useState(isEditMode && event ? event.location : '');
  const [invitedUsers, setInvitedUsers] = useState(isEditMode && event ? event.invitedUsers : []);
  const [description, setDescription] = useState(isEditMode && event ? event.description : '');
  const [error, setError] = useState(null);

  const [userInput, setUserInput] = useState('');

  const addUser = () => {
    if (userInput.trim() && !invitedUsers.includes(userInput.trim())) {
      setInvitedUsers([...invitedUsers, userInput.trim()]);
    }
    setUserInput('');
  };

  const removeUser = (user) => {
    setInvitedUsers(invitedUsers.filter(u => u !== user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return setError('Title is required');
    if (!start.trim()) return setError('Start date and time is required');
    if (!end.trim()) return setError('End date and time is required');
    if (new Date(start) >= new Date(end)) return setError('End date and time must be after start date and time');
    setError(null);
    const newEvent = { title, start, end, allDay, isPriority, location, invitedUsers, description };
    onSubmit(newEvent);
  };

  return (
    <div className="event-modal">
      <div className="form-container">
        <button type="button" onClick={onCancel} className="close">&times;</button>
        <form className="event-form" onSubmit={handleSubmit}>
          <h2>{isEditMode ? 'Edit Event' : 'Create Event'}</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date and Time</label>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date and Time</label>
              <input
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row checkboxes">
            <label>
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
              All Day Event
            </label>
            <label>
              <input
                type="checkbox"
                checked={isPriority}
                onChange={(e) => setIsPriority(e.target.checked)}
              />
              Priority Event
            </label>
          </div>

          <div className="form-group">
            <label>Invited Users</label>
            <div className="user-invite">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter email"
              />
              <button type="button" onClick={addUser}>Add</button>
            </div>
            <ul className="invited-list">
              {invitedUsers.map((user, index) => (
                <li key={index}>
                  {user}
                  <button type="button" onClick={() => removeUser(user)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-buttons">
            {isEditMode ? (
              <>
                <button type="submit" className="save-button">Save</button>
                <button type="button" onClick={onDelete} className="delete-button">Delete</button>
                <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
              </>
            ) : (
              <button type="submit" className="save-button">Create</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAndEditEvent;
