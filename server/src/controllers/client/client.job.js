import Job from "../../models/client/client_jobs.model.js";
import Content from "../../models/freelancer/content.modal.js";

export const getJob = async (req, res) => {
  try {
    const { user_id } = req.body;
    const { id } = req.params;
    console.log(id);
    const jobs = await Job.find({ user_id: id });
    res.json({ jobs });
  } catch (error) {
    console.error("Error getting job:", error);
    res.status(500).json({ error: "Failed to get job" });
  }
};

export const postJob = async (req, res) => {
  try {
    const { user_id, title, description, start_date, skills, budget } =
      req.body;
    const newJob = new Job({
      user_id,
      title,
      description,
      start_date,
      skills,
      budget,
      applicant: {},
    });
    await newJob.save();

    res.status(201).json({ message: "Job posted successfully", data: newJob });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ error: "Failed to post job" });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Content.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Content.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getJobCount = async (req, res) => {
  try {
    const count = await Job.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error getting job count:", error);
    res.status(500).json({ error: "Failed to get job count" });
  }
};
export const getTotalApplications = async (req, res) => {
  try {
    const totalApplication = await Job.aggregate([
      {
        $group: {
          _id: null,
          totalApplication: {
            $sum: { $size: { $objectToArray: "$applicant" } },
          },
        },
      },
    ]);

    if (totalApplication.length === 0) {
      return res.json({ totalApplication: 0 });
    }

    res.json({ count: totalApplication[0].totalApplication });
  } catch (error) {
    console.error("Error counting total application:", error);
    res.status(500).json({ error: "Failed to count total application" });
  }
};
