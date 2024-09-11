import express from 'express';
import { resolveUserId } from '../middleware/validation.js';
import { createRSVP, cancelRSVP } from '../controllers/rsvpController.js';

const router = express.Router();

// RSVP to event
router.post('/:id/rsvp', resolveUserId, createRSVP);

// Cancel the RSVP
router.delete('/:id/rsvp', resolveUserId, cancelRSVP);

export default router;
