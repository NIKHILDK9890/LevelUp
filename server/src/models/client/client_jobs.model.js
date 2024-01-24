import mongoose from "mongoose";

const ClientJobSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  start_date: {
    type: Date,
  },
  skills: {
    type: [String],
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  applicant: {
    type: Map,
    of: Boolean,
  },
});

const Job = mongoose.model("jobs", ClientJobSchema);
export default Job;
