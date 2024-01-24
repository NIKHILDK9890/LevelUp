import mongoose from "mongoose";
import validator from "validator";
import CryptoJS from "crypto-js";
//import isEmail from "validator/lib/isEmail";

const ClientSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

ClientSchema.pre("save", async function (next) {
  const client = this;

  if (client.isModified("password"))
    client.password = CryptoJS.AES.encrypt(
      client.password,
      process.env.PASS_SECURITY_KEY
    );

  next();
});

const Client = mongoose.model("client", ClientSchema);
export default Client;
