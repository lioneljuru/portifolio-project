import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
	eventName: { type: String, required: true },
	eventTime: { type: Date, required: true },
	startTime: { type: Date, required: true },
	endTime: { type: Date, required: true },
	isAllDay: { type: Boolean, default: false },
	isPriority: { type: Boolean, default: false},
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	invitedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	dateCreated: { type: Date, default: Date.now }
});

export const Event = mongoose.model('Event', EventSchema);
