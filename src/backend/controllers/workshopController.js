import WorkshopService from "../services/WorkshopService.js";

export const isAdminOfAnyWorkshop = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const hasWorkshop = await WorkshopService.isAdminOfAnyWorkshop(email);
    return res.status(200).json({ hasWorkshop });
  } catch (error) {
    console.error("Error checking admin workshops:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createWorkshop = async (req, res) => {
  try {
    const { name, admin, crafters, checkpoints } = req.body;

    if (
      !name ||
      !admin ||
      !Array.isArray(crafters) ||
      !Array.isArray(checkpoints)
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const newWorkshop = await WorkshopService.createWorkshop({
      name,
      admin,
      crafters,
      checkpoints,
    });

    return res.status(201).json(newWorkshop);
  } catch (error) {
    console.error("❌ Failed to create workshop:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getWorkshopByAdmin = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: "Admin email is required" });
    }

    const workshop = await WorkshopService.getWorkshopByAdmin(email);

    if (!workshop) {
      return res
        .status(404)
        .json({ error: "No workshop found for this admin" });
    }

    return res.status(200).json(workshop);
  } catch (error) {
    console.error("❌ Failed to get workshop by admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCheckpointStatus = async (req, res) => {
  try {
    const { adminEmail, checkpointName, newStatus } = req.body;

    if (!adminEmail || !checkpointName || !newStatus) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const updated = await WorkshopService.updateCheckpointStatus(
      adminEmail,
      checkpointName,
      newStatus
    );

    if (!updated) {
      return res
        .status(404)
        .json({ error: "Workshop or checkpoint not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Failed to update checkpoint:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
