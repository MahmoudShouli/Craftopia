import AppointmentModel from "../models/AppointmentModel.js";

//creating appointment
export const createAppointment = async (req, res) => {
  const { userEmail, crafterEmail, date } = req.body;

  if (!userEmail || !crafterEmail || !date) {
    return res
      .status(400)
      .json({ error: "Missing userEmail, crafterEmail, or date" });
  }

  try {
    const isDisabling = userEmail === "system";

    const newAppointment = new AppointmentModel({
      userEmail,
      crafterEmail,
      date: new Date(date),
      status: isDisabling ? "disabled" : "pending",
    });

    const saved = await newAppointment.save();

    console.log(
      `✅ ${isDisabling ? "Disabled date" : "Created appointment"}:`,
      saved
    );
    res.status(isDisabling ? 200 : 201).json(saved);
  } catch (err) {
    console.error("❌ Error saving appointment:", err.message);
    res.status(500).json({ error: err.message });
  }
};

//get all the appointments related of an email
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

//delete an appointment
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const appointment = await AppointmentModel.findById(id);

    console.log("Trying to delete appointment:");
    console.log("ID:", id);
    console.log("Role:", role);
    console.log("Appointment Status:", appointment?.status);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Updated rule:
    if (
      role !== "crafter" &&
      !["pending", "completed"].includes(appointment.status)
    ) {
      return res.status(400).json({
        error: "You can only delete pending or completed appointments.",
      });
    }

    await AppointmentModel.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Optionally validate status values
    const allowedStatuses = ["pending", "confirmed", "completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    await AppointmentModel.findByIdAndUpdate(id, { status });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
