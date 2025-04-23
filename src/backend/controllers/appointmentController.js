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

export const disableDate = async (req, res) => {
  const { crafterEmail, date } = req.body;

  console.log("📥 Incoming disableDate request:", { crafterEmail, date });

  if (!crafterEmail || !date) {
    console.warn("⚠️ Missing crafterEmail or date");
    return res.status(400).json({ error: "Missing crafterEmail or date" });
  }

  try {
    const created = await AppointmentModel.create({
      crafterEmail,
      userEmail: "system",
      date: new Date(date),
      status: "disabled",
    });

    console.log("✅ Appointment created:", created);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Mongoose create error:", err.message);
    res.status(500).json({ error: "Failed to disable date" });
  }
};

// Enable a date (remove the system appointment)
export const enableDate = async (req, res) => {
  const { crafterEmail, date } = req.body;

  if (!crafterEmail || !date) {
    return res.status(400).json({ error: "Missing crafterEmail or date" });
  }

  try {
    await AppointmentModel.deleteOne({
      crafterEmail,
      customerEmail: "system",
      date: new Date(date),
    });

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to enable date:", err.message);
    res.status(500).json({ error: "Failed to enable date" });
  }
};

// Get all disabled dates for a crafter
export const getDisabledDates = async (req, res) => {
  const { crafterEmail } = req.params;
  try {
    const disabledAppointments = await AppointmentModel.find({
      crafterEmail,
      customerEmail: "system",
    });

    res.json(disabledAppointments.map((a) => a.date));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch disabled dates" });
  }
};
