import React, { createContext, useState, useEffect } from "react";

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



  // Function to create a new event
  const createEvent = (newEvent) => {
    // Here, you'd typically make an API call to store the event in a backend
    // For now, we'll just update the local state
    setEventData((prevEvents) => [...prevEvents, newEvent]);
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
    <EventContext.Provider value={{ eventData, createEvent, fetchEvents }}>
      {children}
    </EventContext.Provider>
  )
}