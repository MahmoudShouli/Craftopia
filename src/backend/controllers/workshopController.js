import WorkshopService from "../services/WorkshopService.js";

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

export const getWorkshopsByAdmin = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: "Admin email is required" });
    }

    const workshop = await WorkshopService.getWorkshopsByAdmin(email);

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

export const getWorkshopsByCrafter = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: "Crafter email is required." });
  }

  try {
    const workshops = await WorkshopService.getWorkshopsByCrafter(email);
    res.json(workshops);
  } catch (err) {
    console.error("❌ Failed to get workshops by crafter:", err);
    res.status(500).json({ error: "Server error." });
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

export const updateCheckpointOrder = async (req, res) => {
  try {
    const { adminEmail, checkpoints } = req.body;

    if (!adminEmail || !Array.isArray(checkpoints)) {
      return res.status(400).json({ error: "Missing or invalid fields" });
    }

    const updated = await WorkshopService.updateCheckpointOrder(
      adminEmail,
      checkpoints
    );

    if (!updated) {
      return res.status(404).json({ error: "Workshop not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Failed to update checkpoint order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeCrafter = async (req, res) => {
  const { workshopId } = req.params;
  const { crafterEmail } = req.body;

  if (!workshopId || !crafterEmail) {
    return res
      .status(400)
      .json({ error: "Workshop ID and crafter email are required." });
  }

  try {
    const updated = await WorkshopService.removeCrafterFromWorkshop(
      workshopId,
      crafterEmail
    );
    if (!updated) return res.status(404).json({ error: "Workshop not found." });

    res.json(updated);
  } catch (err) {
    console.error("❌ Error removing crafter:", err);
    res.status(500).json({ error: "Server error." });
  }
};
