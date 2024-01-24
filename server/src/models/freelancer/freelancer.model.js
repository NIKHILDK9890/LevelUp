import mongoose from "mongoose";
import validator from "validator";
import CryptoJS from "crypto-js";
const FreelancerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid Email");
      },
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      trim: true,
      validate(value) {
        if (!validator.isAlpha(value.split(" ").join("")))
          throw new Error("Not a name");
      },
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      trim: true,
      validate(value) {
        if (!validator.isAlpha(value.split(" ").join("")))
          throw new Error("Not a name");
      },
    },
    password: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

FreelancerSchema.pre("save", async function (next) {
  const freelancer = this;
  if (freelancer.isModified("password"))
    freelancer.password = CryptoJS.AES.encrypt(
      freelancer.password,
      process.env.PASS_SECURITY_KEY
    );
  next();
});
const Freelancer = mongoose.model("freelancer", FreelancerSchema);
export default Freelancer;
