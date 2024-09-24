# Scheduly
``A web app built using Node.js, Express, MongoDB and passport.js for session-based authentication.
The API allows for event creation, management, RSVP functionality and user authentication.
The application is structured around specific roles and permissions ensuring that only invited users
can see or RSVP to the events``

## Table of contents

1. Project Overview
2. Authentication
3. Event Management
4. RSVP Functionality
5. Error Handling
6. Environment variables
7. Installation Guide

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
fields like the title, description, start, end and an array of invited users.
1. Create an Event
2. Update an Event
3. Delete an Event
4. Get All Events
5. Get Event by ID

### RSVP Functionality

Only invited users can RSVP to an event, and they can also cancel their RSVPs.
1. RSVP to an Event
2. Cancel an RSVP

* For documentation of the API, please [click here](./backend/apidocs.md)

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
   * 500 Internal server Error: Returns, if a server meets an unexpected condition
     that prevents it from fulfilling the request made by the client or user.

and many more.

### Environment Variables

The app requires several environment variables to be set in a .env file:

| Variable| Description |
|:-|:-|
| SESSIONSECRET | Secret key for session management |
| PORT | Port number for the server |
| HOST | MongoDB connection string |

### Installation Guide

After cloning this repository in your local machine, please follow these steps in these order to get the app running:

#### Step 1:
migrate to the backend repository and run ```npm install``` to install all dependencies

#### Step 2:
make sure mongodb is running on your PC (to start you can use ```sudo service mongod start``` on ubuntu distro of linux. please find the equilvalent of your OS)

#### Step 3:
Once mongoDb is running successfully, start the express server: ```npm run start-dev``` for development with nodemon or ```npm run start``` for deployment. it should show the port and hostname , example:
```
   ifyzi@ifyzi:~/scheduly/backend$
         server is running on http://localhost:3003
         connected to database
```

#### Step 4:
Migrate to the front-end directory and install the dependecies
```npm install```

#### Step 5:
Start the react server:
```npm run start```

#### Step 6:
Navigate to your browser and enter your hostname and the port 3000, example:
```http://localhost:3000/```

### Conclusion
Scheduly provides a robust system for creating, managing, and RSVPing to events
It uses Passport.js for session-based authentication, ensuring that only invited users
can RSVP.
