import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

//Create EventContext
export const EventContext = createContext();

//Create EventProvider component to wrap around the components and provide event-related data
export const EventProvider = ({ children }) => {
  const [eventData, setEventData] = useState([]); // This will store all the events

  // Load events from localStorage when the component mounts
  /*useEffect(() => {
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
  }, [eventData]);*/


  //localStorage.removeItem('events');
  //localStorage.removeItem('user');
  console.log(localStorage.getItem('user'));
  const newEvent = {
    title: 'Created one event',
    start: '2021-09-03T12:00:00',
    end: '2021-09-03T15:00:00',
    invitedUsers: ['test123@gmail.com'],
    allDay: false,
    location: 'Location one',
    description: 'Description 3',
  }

  const createEvent = async (newEvent) => {
    try {
      // Make sure the endpoint is correct, add base URL if necessary.
      // const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post('/events', newEvent);

      // Assuming the backend responds with the created event.
      const createdEvent = response.data;

      // Log the created event
      console.log('Event created:', createdEvent);

    } catch (error) {
      // If the error response contains detailed info
      if (error.response) {
        console.error('Error creating event:', error.response.data);
      } else {
        // General network errors or other issues
        console.error('Error creating event:', error.message);
      }
    }
  }

  // Call the function to create the event
  createEvent(newEvent);


  const getEvent = async () => {
    try {
      // Make sure the endpoint is correct, add base URL if necessary.
      // const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get('/events');

      // Assuming the backend responds with the created event.
      const getEvent = response.data;

      // Log the created event
      console.log('Get events:', getEvent);

    } catch (error) {
      // If the error response contains detailed info
      if (error.response) {
        console.error('Error creating event:', error.response.data);
      } else {
        // General network errors or other issues
        console.error('Error creating event:', error.message);
      }
    }
  }

  //getEvent();
  //const createEvent = () => { };



  // CRUD operations
  // Function to create a new event
  /*const createEvent = async (newEvent) => {
    try {
      const response = await axios.post('/events', newEvent);
      const createdEvent = response.data.event;
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
      throw error;
    }
  };*/

  const updateEvent = (updatedEvent) => {
    setEventData((prevEvents) =>
      prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event)
    );
  };

  const deleteEvent = (eventId) => {
    setEventData((prevEvents) => prevEvents.filter(event => event.id !== eventId));
  };

  // Function to fetch events (mocked for now)
  const fetchEvents = () => {
    // API call to fetch events from backend would go here
    // For now, let's mock the data
    const mockedEvents = [
      {
        name: "Event 1",
        date: "2021-09-01",
        time: "10:00",
        location: "Location 1",
        description: "Description 1",
      },
      {
        name: "Event 2",
        date: "2021-09-02",
        time: "11:00",
        location: "Location 2",
        description: "Description 2",
      },
    ];
    console.log('Fetching events:', mockedEvents);
    setEventData(mockedEvents);
  };

  return (
    <EventContext.Provider value={{ eventData, createEvent, fetchEvents, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  )
}