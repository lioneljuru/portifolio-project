import mongoose from 'mongoose';

const RSVPSchema = new mongoose.Schema({
	event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	date: { type: Date, default: Date.now }
});

export const RSVP = mongoose.model('RSVP', RSVPSchema);
