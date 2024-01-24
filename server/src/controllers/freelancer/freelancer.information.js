import Freelancer from "../../models/freelancer/freelancer.model.js";
import FreelancerInformation from "../../models/freelancer/information.model.js";

export const getFreelancerData = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the freelancer information by the provided user_id
    const freelancerInfo = await Freelancer.findOne({
      _id: userId,
    });

    if (!freelancerInfo) {
      return res
        .status(404)
        .json({ error: "Freelancer information not found" });
    }

    res.status(200).json({
      message: "Freelancer information retrieved successfully",
      data: freelancerInfo,
    });
  } catch (error) {
    console.error("Error retrieving freelancer information:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve freelancer information" });
  }
};

export const getFreelancerInformation = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the freelancer information by the provided user_id
    const freelancerInfo = await FreelancerInformation.findOne({
      user_id: userId,
    });

    if (!freelancerInfo) {
      return res
        .status(404)
        .json({ error: "Freelancer information not found" });
    }

    res.status(200).json({
      message: "Freelancer information retrieved successfully",
      data: freelancerInfo,
    });
  } catch (error) {
    console.error("Error retrieving freelancer information:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve freelancer information" });
  }
};

// PATCH /freelancer/:id
const updateFreelancerInformation = async (req, res) => {
  try {
    const { headline, skills, scope, budget, whatsappNo } = req.body;

    const id = req.user_id;
    console.log(req.user_id);
    console.log(id);

    // Find the freelancer information by the provided id
    const freelancerInfo = await FreelancerInformation.findOne({
      user_id: id,
    });

    if (!freelancerInfo) {
      return res
        .status(404)
        .json({ error: "Freelancer information not found" });
    }

    // Update the freelancer information fields
    if (headline) {
      freelancerInfo.headline = headline;
    }
    if (skills) {
      freelancerInfo.skills = skills;
    }
    if (scope) {
      freelancerInfo.scope = scope;
    }
    if (budget) {
      freelancerInfo.budget = budget;
    }

    if (whatsappNo) {
      freelancerInfo.whatsappNo = whatsappNo;
    }

    if (req.file.filename) {
      freelancerInfo.profilePhoto = req.file.filename;
    }
    // Save the updated freelancer information
    await freelancerInfo.save();

    res.status(200).json({
      message: "Freelancer information updated successfully",
      data: freelancerInfo,
    });
  } catch (error) {
    console.error("Error updating freelancer information:", error);
    res.status(500).json({ error: "Failed to update freelancer information" });
  }
};

export { updateFreelancerInformation };
