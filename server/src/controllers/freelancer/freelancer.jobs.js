import Job from "../../models/client/client_jobs.model.js";
export const getJob = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json({ jobs });
  } catch (error) {
    console.error("Error getting job:", error);
    res.status(500).json({ error: "Failed to get job" });
  }
};
export const applyJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    console.log(userId);
    const job = await Job.findById(id);
    const isApplied = job.applicant.get(userId);

    if (isApplied) {
      job.applicant.delete(userId);
    } else {
      job.applicant.set(userId, true);
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { applicant: job.applicant },
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
