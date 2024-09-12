import express from 'express';
import { getUserFromSession, resolveUserId } from '../middleware/validation.js';
import { createRSVP, cancelRSVP } from '../Controller/rsvpController.js';

const router = express.Router();

// RSVP to event
router.post('/events/:id/rsvp', getUserFromSession, resolveUserId, createRSVP);

// Cancel the RSVP
router.delete('/events/:id/rsvp', getUserFromSession, resolveUserId, cancelRSVP);

export {router};
