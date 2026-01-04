// ===============================
// backend/routes/auth.routes.js
// ===============================
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

const router = express.Router();

const USERS_FILE = "./users.json";
const SECRET = "super-secret-key"; // SOLO PARA MVP

// helpers
const getUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
};

const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const exists = users.find((u) => u.username === username);
  if (exists) {
    return res.status(400).json({ message: "Usuario ya existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    username,
    password: hashedPassword
  });

  saveUsers(users);

  res.json({ message: "Usuario creado correctamente" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign({ username }, SECRET, {
    expiresIn: "1h"
  });

  res.json({ token });
});

export default router;