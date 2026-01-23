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
    if (!fs.existsSync(USERS_FILE)) {
      console.log("users.json does not exist, creating empty array");
      return [];
    }
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error leyendo users.json:", error);
    return [];
  }
};

const saveUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error guardando users.json:", error);
    throw error;
  }
};

// ===============================
// REGISTER
// ===============================
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username y password son requeridos" });
    }

    const users = getUsers();
    console.log("Register attempt for:", username);

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
    console.log("User registered successfully:", username);

    res.json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
});

// ===============================
// LOGIN
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username y password son requeridos" });
    }

    const users = getUsers();
    console.log("Login attempt for:", username);
    console.log("Users file path:", USERS_FILE);
    console.log("Users count:", users.length);

    const user = users.find((u) => u.username === username);
    if (!user) {
      console.log("User not found:", username);
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    console.log("User found, comparing password...");
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      console.log("Invalid password for user:", username);
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ username }, SECRET, {
      expiresIn: "1h",
    });

    console.log("Login successful for user:", username);
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
});

// ===============================
// GET USERS (solo para debug / MVP)
// ===============================
router.get("/users", (req, res) => {
  try {
    const users = getUsers();

    // ⚠️ ocultamos passwords
    const safeUsers = users.map((u) => ({
      username: u.username,
    }));

    res.json(safeUsers);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;