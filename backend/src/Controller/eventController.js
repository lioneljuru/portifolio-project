import { Event } from '../models/Event.js';
import { User } from '../models/userSchema.js'

export const createEvent = async (req, res) => {
  const { title,
         description,
         location,
         start,
         end,
         allDay,
         isPriority,
        } = req.body;
  let { invitedUsers } = req.body;

    // check if input from user is @users and fill invited users with all users in the database
    if (invitedUsers[0] === '@users'){
      const users = await User.find({}, {email: 1}) // returns only the email fields
      const emails = users.map(users => users.email);
      invitedUsers = emails;
    }

    if (!req.nonExistingUsers || req.nonExistingUsers.length === 0) {
      try {
        const event = new Event({
          title,
          description,
          location,
          start,
          end,
          allDay,
          isPriority,
          createdBy: req.user.id,
          invitedUsers
        });
        await event.save();
        res.status(201).json(event);
      } catch (err) {
        console.error(err.message);
        res.status(400).json({error: `${err}`});
      }
    } else {
      const userNotFound = req.nonExistingUsers.map(item => item);
      return res.status(404).json({error: `${userNotFound} not found`})
    }
  };

export const getEvents = async (req, res) => {
  try {
    const { user } = req;
    const userId = user._id
    const events = await Event.find({
      $or: [
        { createdBy: userId },
        { invitedUsers: { $in: [user.email] } }
      ]
    });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', ['name', 'email']);
    if (!event) return res.status(404).json({ msg: 'Event Not Found' });
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateEvent = async (req, res) => {
  const { title,
         description,
         location,
         start,
         end,
         allDay,
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
      title,
      description,
      location,
      start,
      end,
      allDay,
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
