import Client from "../../models/client/client.model.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newClient = new Client({
      firstName,
      lastName,
      email,
      password,
    });

    await newClient.save();
    res.status(201).json({ message: "Client Registered" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, client_password } = req.body;

    const user = await Client.findOne({ email: email });

    if (!user) return res.status(401).json({ message: "User does not exist" });

    if (!isPasswordCorrect(client_password, user.password))
      return res.status(401).json({ message: "Wrong Password" });

    const accessToken = jwt.sign(
      {
        id: user._id,
        client: true,
      },
      process.env.JWT_SECURITY_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...userdata } = user._doc;
    res.status(200).json({ userdata, accessToken });
  } catch (e) {
    res.status(500).json({ message: "Internal Error" });
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

export const getClientCount = async (req, res) => {
  try {
    const count = await Client.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error getting client count:", error);
    res.status(500).json({ error: "Failed to get client count" });
  }
};
