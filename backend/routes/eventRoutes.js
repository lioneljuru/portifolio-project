import express from 'express';
import { resolveUserId } from '../middleware/validation.js';
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

// Create The event
router.post('/', resolveUserId, createEvent);

// List all the events
router.get('/', getEvents);

// Get a precise event using it's id
router.get('/:id', getEventById);

// Updates an already existing event
router.put('/:id', resolveUserId, updateEvent);

// Deletes an event
router.delete('/:id', resolveUserId, deleteEvent);

export default router;
