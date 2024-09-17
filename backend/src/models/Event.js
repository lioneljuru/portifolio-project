import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String, required: true },
  start: { type: Date, default: Date.now},
  end: { type: Date, default: Date.now },
  allDay: { type: Boolean, default: false },
  location: {type: String, default: "remote"},
  isPriority: { type: Boolean, default: false},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  invitedUsers: [{ type: String }],
  dateCreated: { type: Date, default: Date.now }
});

export const Event = mongoose.model('Event', EventSchema);
