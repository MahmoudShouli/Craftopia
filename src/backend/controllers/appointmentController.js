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
    const appointments = await AppointmentModel.find({
      $or: [{ userEmail: email }, { crafterEmail: email }],
    }).sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
