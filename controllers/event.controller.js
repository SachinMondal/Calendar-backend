const Event = require("../models/eventSchema");

// Add Event
const addEvent = async function(req, res) {
    const { title, description, start, end, allDay } = req.body;
    const userId = req.user.id; // userId is a string here

    try {
        const event = new Event({ title, description, start, end, allDay, creator: userId });
        await event.save();
        res.json(event);
    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
    }
};

// Get User Events
const getUserEvent = async function(req, res) {
    const userId = req.user.id;

    try {
        const events = await Event.find({ creator: userId }); // creator is a string

        if (!events.length) {
            return res.status(200).json({ msg: 'No events found for this user' });
        }

        res.json(events);
    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
    }
};

// Edit Event
const editEvent = async function(req, res) {
    const { title, description, start, end } = req.body;

    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { title, description, start, end },
            { new: true } // return the updated document
        );

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        res.json(event);
    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
    }
};

// Delete Event
const deleteEvent = async function(req, res) {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        res.json({ msg: "Event deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
};

module.exports = {
    addEvent,
    getUserEvent,
    editEvent,
    deleteEvent
};
