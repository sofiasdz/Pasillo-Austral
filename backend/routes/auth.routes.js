// ===============================
// backend/routes/auth.routes.js
// ===============================

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const SECRET = "super-secret-key"; // SOLO PARA MVP

// ===============================
// Fix para __dirname en ES Modules
// ===============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// users.json está en backend/users.json
const USERS_FILE = path.join(__dirname, "../users.json");

// ===============================
// Helpers
// ===============================
const getUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error leyendo users.json:", error);
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// ===============================
// REGISTER
// ===============================
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
    password: hashedPassword,
  });

  saveUsers(users);

  res.json({ message: "Usuario creado correctamente" });
});

// ===============================
// LOGIN
// ===============================
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
    expiresIn: "1h",
  });

  res.json({ token });
});

// ===============================
// GET USERS (solo para debug / MVP)
// ===============================
router.get("/users", (req, res) => {
  const users = getUsers();

  // ⚠️ ocultamos passwords
  const safeUsers = users.map((u) => ({
    username: u.username,
  }));

  res.json(safeUsers);
});

export default router;
