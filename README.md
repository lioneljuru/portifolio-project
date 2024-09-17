# Scheduly
``A web app built using Node.js, Express, MongoDB and passport.js for session-based authentication.
The API allows for event creation, management, RSVP functionality and user authentication.
The application is structured around specific roles and permissions ensuring that only invited users
can RSVP to events``

## Table of contents

1. Project Overview
2. Authentication
3. Event Management
4. RSVP Functionality
5. Error Handling

### Project Overview

Scheduly allows authenticated users to  create and manage events, invite specific
users to RSVP, and track RSVPs. the key features include:
* User Registration and Login: Handled using Passport.js for sessionbased authentication
* Event Management: Authenticated users can create, update, and delete events
* RSVP System: Only invited users can RSVP for events, and they can cancel their RSVPs if needed

### Authentication

It uses Passport.js with the local strategy to manage user authentication.
This means that users must register and log in using an email and password
1. Register a User
2. Login a User
3. Logout a User

### Event Management

Only authenticated users can create, update, and delete events. Each event has
fields like the event name, start, end and a list of invited users.
1. Create an Event
2. Update an Event
3. Delete an Event
4. Get All Events
5. Get Event by ID

### RSVP Functionality

Only invited users can RSVP to an event, and they can also cancel their RSVPs.
1. RSVP to an Event
2. Cancel an RSVP

### Error Handling

It returns descriptive error messages for various scenarios, including
authentication errors, missing resources, and invalid input. Below are common 
error responses:
1. Authentication Errors
   * 401 Unauthorized: Returned is user tries to access a protected route without being authenticated
2. Permission Errors
   * 403 Forbidden: Returned if a user tries to RSVP to an event they are not invited to.
3. Not Found Errors
   * 404 Not Found: Returned if an event or RSVP is not found.
4. Validation Errors
   * 400 Bad Request: Returned if the input data for event creation or update is invalid
5. Server Errors
   * 500 Internal server Error: Returnet if a server meets an unexpected condition
     that prevents it from fulfilling the request made by the client or user.

### Environment Variables

The app requires several environment variables to be set in a .env file:

| Variable| Description |
|:-|:-|
| SESSIONSECRET | Secret key for session management |
| PORT | Port number for the server |
| HOST | MongoDB connection string |

### Conclusion
Scheduly provides a robust system for creating, managing, and RSVPing to events
It uses Passport.js for session-based authentication, ensuring that only invited users
can RSVP.
