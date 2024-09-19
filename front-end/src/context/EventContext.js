import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

//Create EventContext
export const EventContext = createContext();

//Create EventProvider component to wrap around the components and provide event-related data
export const EventProvider = ({ children }) => {
  const [eventData, setEventData] = useState([]); // This will store all the events

  // Load events from localStorage when the component mounts
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEventData(JSON.parse(storedEvents));
    } else {
      fetchEvents(); // Fetch events if no data is present in localStorage
    }
  }, []);

  // Save events to localStorage whenever eventData changes
  useEffect(() => {
    if (eventData.length > 0) {
      localStorage.setItem('events', JSON.stringify(eventData));
    }
  }, [eventData]);


  //localStorage.removeItem('events');
  //console.log('Events ', localStorage.getItem('events'));
  //localStorage.removeItem('user');
  //console.log(localStorage.getItem('user'));

  // CRUD operations
  // Function to create a new event
  const createEvent = async (newEvent) => {
    try {
      const response = await axios.post('/events', newEvent);
      const createdEvent = response.data;
      setEventData((prevEvents) => [...prevEvents, createdEvent]);
      toast.success('Event created successfully');
    } catch (error) {
      let errorMessage = 'Something went wrong, please try again';
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        errorMessage = error.response.data.error || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        //  Handle network errors, The request was made but no response was received
        errorMessage = "No response from the server, please try again";
      }
      // Something happened in setting up the request that triggered an Error
      toast.error(errorMessage);
      //throw error;
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/events');
      const events = response.data;
      setEventData(events);
    } catch (error) {
      let errorMessage = 'Something went wrong, please try again';
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        errorMessage = error.response.data.error || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        //  Handle network errors, The request was made but no response was received
        errorMessage = "No response from the server, please try again";
      }
      // Something happened in setting up the request that triggered an Error
      toast.error(errorMessage);
      //throw error
    }
  };

  const updateEvent = async (updatedEvent) => {
    console.log('Updated Event ', updatedEvent);
    try {
      const response = await axios.put(`/events/${updatedEvent._id}`, updatedEvent);
      const updatedEventData = response.data;
      setEventData((prevEvents) => prevEvents.map(event => event._id === updatedEventData._id ? updatedEventData : event));
      toast.success('Event updated successfully');
    } catch (error) {
      let errorMessage = 'Something went wrong, please try again';
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        errorMessage = error.response.data.error || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        //  Handle network errors, The request was made but no response was received
        errorMessage = "No response from the server, please try again";
      }
      // Something happened in setting up the request that triggered an Error
      toast.error(errorMessage);
      //throw error;
    }
  };

  const deleteEvent = async (eventId) => {
    console.log('Event ID ', eventId);
    try {
      await axios.delete(`/events/${eventId}`);
      setEventData((prevEvents) => prevEvents.filter(event => event._id !== eventId));
      toast.success('Event deleted successfully');
    } catch (error) {
      let errorMessage = 'Something went wrong, please try again';
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        errorMessage = error.response.data.error || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        // Handle network errors, The request was made but no response was received
        errorMessage = "No response from the server, please try again";
      }
      // Something happened in setting up the request that triggered an Error
      toast.error(errorMessage);
      //throw error;
    }
  };

  return (
    <EventContext.Provider value={{ eventData, createEvent, fetchEvents, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  )
}