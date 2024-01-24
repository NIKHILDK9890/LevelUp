import Freelancer from "../../models/freelancer/freelancer.model.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import FreelancerInformation from "../../models/freelancer/information.model.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, state } = req.body;
    const newFreelancer = new Freelancer({
      firstName,
      lastName,
      email,
      password,
      state,
    });

    const user = await newFreelancer.save();
    const information = new FreelancerInformation({
      user_id: user._id.toString(),
      headline: "headline",
      skills: [],
      scope: "scope",
      budget: 0,
      profilePhoto: "profilePhoto",
      whatsappNo: 0,
    });
    await information.save();
    res.status(201).json({ message: "Freelancer registered" });
  } catch (e) {
    res.status(500).json({ message: "User Already Exists", e: e });
  }
};

export const login = async (req, res) => {
  try {
    const { email, freelancer_password } = req.body;
    const user = await Freelancer.findOne({ email: email });
    if (!user) return res.status(401).json({ message: "User does not exist" });

    if (!isPasswordCorrect(freelancer_password, user.password))
      return res.status(401).json({ message: "Wrong Password" });

    const accessToken = jwt.sign(
      {
        id: user._id,
        freelancer: true,
      },
      process.env.JWT_SECURITY_KEY,
      { expiresIn: "3d" }
    );

    const userInformation = await FreelancerInformation.findOne({
      user_id: user._id,
    });

    const information = userInformation
      ? userInformation._doc.headline == "headline"
        ? false
        : userInformation._doc
      : null;

    const { password, ...userdata } = user._doc;
    res.status(200).json({ userdata, accessToken, information });
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
};

const isPasswordCorrect = (password, dbPassword) => {
  const hashedPassword = CryptoJS.AES.decrypt(
    dbPassword,
    process.env.PASS_SECURITY_KEY
  );

  const originaldbPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  if (originaldbPassword != password) return false;
  else return true;
};

export const getFreelancerCount = async (req, res) => {
  try {
    const count = await Freelancer.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error getting freelancer count:", error);
    res.status(500).json({ error: "Failed to get freelancer count" });
  }
};
