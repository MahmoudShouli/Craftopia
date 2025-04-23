import AppointmentModel from "../models/AppointmentModel.js";

export const createAppointment = async (req, res) => {
  try {
    const { userEmail, crafterEmail, date } = req.body;

    const newAppointment = new AppointmentModel({
      userEmail,
      crafterEmail,
      date,
      status: "pending",
    });

    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating appointment:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getAppointmentsByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const role = req.query.role;

    let filter = {};

    if (role === "crafter") {
      filter = { crafterEmail: email };
    } else if (role === "user") {
      filter = { userEmail: email };
    } else {
      // fallback: fetch all where user is either side
      filter = {
        $or: [{ userEmail: email }, { crafterEmail: email }],
      };
    }

    const appointments = await AppointmentModel.find(filter).sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await AppointmentModel.findById(id);
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });

    const secondsSinceCreation =
      (new Date() - new Date(appointment.createdAt)) / 1000;

    // 10 second cutoff for testing (change to 86400 for 24 hours)
    if (secondsSinceCreation > 86400) {
      return res
        .status(400)
        .json({ error: "Cannot cancel appointment after the allowed time." });
    }

    await AppointmentModel.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
