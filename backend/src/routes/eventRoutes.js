import express from 'express';
import { resolveUserId, getUserFromSession } from '../middleware/validation.js';
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from '../Controller/eventController.js';

const router = express.Router();

// Create The event
router.post('/events', getUserFromSession, createEvent);

// List all the events
router.get('/events', getEvents);

// Get a precise event using it's id
router.get('/events/:id', getUserFromSession, getEventById);

// Updates an already existing event
router.put('/events/:id', getUserFromSession, resolveUserId, updateEvent);

// Deletes an event
router.delete('/events/:id', getUserFromSession, resolveUserId, deleteEvent);

export {router};
