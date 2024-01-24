import mongoose from "mongoose";

const FreelancerInformationSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  scope: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  whatsappNo: {
    type: Number,
    required: true,
  },
  profilePhoto: String,
});

const FreelancerInformation = mongoose.model(
  "FreelancerInformation",
  FreelancerInformationSchema
);

export default FreelancerInformation;
