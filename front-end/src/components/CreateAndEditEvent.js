import React, { useState } from 'react';
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
    if (!start) return setError('Start date and time is required');
    if (!end) return setError('End date and time is required');
    if (new Date(start) >= new Date(end)) return setError('End date and time must be after start date and time');
    setError(null);
    const newEvent = { title, start, end, allDay, isPriority, location, invitedUsers, description };
    if (isEditMode && event) {
      newEvent._id = event._id; // Include the event ID if in edit mode
    }
    onSubmit(newEvent);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError(null);
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
                onChange={handleInputChange(setTitle)}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={handleInputChange(setLocation)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date and Time</label>
              <input
                type="datetime-local"
                value={start}
                onChange={handleInputChange(setStart)}
              />
            </div>
            <div className="form-group">
              <label>End Date and Time</label>
              <input
                type="datetime-local"
                value={end}
                onChange={handleInputChange(setEnd)}
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
                onChange={handleInputChange(setUserInput)}
                placeholder="Enter email"
              />
              <button type="button" onClick={addUser}>Add</button>
            </div>
            <ul className="invited-list">
              {invitedUsers.map((user, index) => (
                <li key={index}>
                  {user}
                  <button type="button" onClick={() => removeUser(user)}>
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={handleInputChange(setDescription)}
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
