import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) return res.status(401).json({ message: "Invalid email or password." });

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return res.status(401).json({ message: "Invalid email or password." });

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
  } catch (err) {
    console.error("Login failed:", err);
    return res.status(500).json({ message: "Login failed." });
  }
}

export async function me(req, res) {
  try {
    const admin = await Admin.findById(req.admin.id).select("-passwordHash");
    if (!admin) return res.status(404).json({ message: "Admin not found." });
    return res.json(admin);
  } catch (err) {
    console.error("Could not validate admin session:", err);
    return res.status(500).json({ message: "Could not validate admin session." });
  }
}
