import { Event } from '../models/Event.js';

export const createEvent = async (req, res) => {
  const { eventName,
         eventTime,
         startTime,
         endTime,
         isAllDay,
         isPriority,
         invitedUsers
        } = req.body;
  
  try {
    const event = new Event({
      eventName,
      eventTime,
      startTime,
      endTime,
      isAllDay,
      isPriority,
      createdBy: req.user.id,
      invitedUsers
    });
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', ['firstname', 'email']);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', ['firstname', 'email']);
    if (!event) return res.status(404).json({ msg: 'Event Not Found' });
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateEvent = async (req, res) => {
  const { eventName,
         eventTime,
         startTime,
         endTime,
         isAllday,
         isPriority,
         invitedUsers
        } = req.body;
  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event Not Found' });
    
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User Not Authorized' });
    }
    
    const updatedEvent = {
      eventName,
      eventTime,
      startTime,
      endTime,
      isAllDay,
      isPriority,
      invitedUsers
    };
    
    event = await Event.findByIdAndUpdate(req.params.id, { $set: updatedEvent }, { new: true });
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event Not Found' });
    
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User Not Authorized' });
    }
    
    await event.remove();
    res.json({ msg: 'Event Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
