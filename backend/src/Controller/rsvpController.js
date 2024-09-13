import { RSVP } from '../models/RSVP.js';
import { Event } from '../models/Event.js';

export const createRSVP = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) return res.status(404).json({ msg: 'Event Not Found' });

		if (!event.inveitedUsers.includes(req.user.id)) {
			return res.status(403).json({ msg: 'You are not allowed to RSVP to this event' });

		const rsvp = new RSVP({
			event: req.params.id,
			user: req.user.id
		});
		await rsvp.save();
		res.json(rsvp);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

export const cancelRSVP = async (req, res) => {
	try {
		const rsvp = await RSVP.findOne({ event: req.params.id, user: req.user.id });
		if (!rsvp) return res.status(404).json({ msg: 'RSVP Not Found' });

		await rsvp.remove();
		res.json({ msg: 'RSVP Cancelled' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};
