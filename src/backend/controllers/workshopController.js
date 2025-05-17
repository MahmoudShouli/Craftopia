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
