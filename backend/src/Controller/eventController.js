import { Event } from '../models/Event.js';
import { User } from '../models/userSchema.js'

export const createEvent = async (req, res) => {
  const { location, isPriority, allDay } = req.body;
  const title = (req.body.title) ? req.body.title : " ";
  const description = (req.body.description) ? req.body.description : " ";
  const start = (req.body.start) ? req.body.start : "";
  const end = (req.body.end) ? req.body.end : "";

  let { invitedUsers } = req.body;

    // check if input from user is @users and fill invited users with all users in the database
    if (invitedUsers[0] === '@users'){
      const users = await User.find({}, {email: 1}) // returns only the email fields
      const emails = users.map(users => users.email);
      invitedUsers = emails;
    }

    if ((!req.nonExistingUsers) || (req.nonExistingUsers.length === 0)) {
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
      return res.status(404).json({error: `${req.nonExistingUsers} Not found`});
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
  const { body } = req;
  const { location, isPriority, allDay } = body;
  const title = (body.title) ? body.title : "";
  const description = (body.description) ? body.description : "";
  const start = (body.start) ? body.start : "";
  const end = (body.end) ? body.end : "";
  const invitedUsers = (body.invitedUsers) ? body.invitedUsers : []

  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event Not Found' });

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User Not Authorized To Update' });
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
      return res.status(401).json({ msg: 'User Not Authorized To Delete' });
    }

    await event.deleteOne();
    res.json({ msg: 'Event Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
