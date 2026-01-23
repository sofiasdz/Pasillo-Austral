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
    console.log("=== REGISTER REQUEST ===");
    console.log("Body:", req.body);
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      console.log("Missing username or password");
      return res.status(400).json({ message: "Username y password son requeridos" });
    }

    const users = getUsers();
    console.log("Register attempt for:", username);
    console.log("Current users count:", users.length);
    console.log("Users file path:", USERS_FILE);

    const exists = users.find((u) => u.username === username);
    if (exists) {
      console.log("User already exists");
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    users.push({
      username,
      password: hashedPassword,
    });

    saveUsers(users);
    console.log("User saved. New users count:", users.length);
    console.log("=== REGISTER SUCCESS ===");

    res.status(200).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("=== REGISTER ERROR ===");
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
});

// ===============================
// LOGIN
// ===============================
router.post("/login", async (req, res) => {
  try {
    console.log("=== LOGIN REQUEST ===");
    console.log("Body:", req.body);
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      console.log("Missing username or password");
      return res.status(400).json({ message: "Username y password son requeridos" });
    }

    const users = getUsers();
    console.log("Login attempt for:", username);
    console.log("Users file path:", USERS_FILE);
    console.log("Users count:", users.length);
    console.log("Users:", users.map(u => u.username));

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
    console.log("=== LOGIN SUCCESS ===");
    
    res.status(200).json({ token });
  } catch (error) {
    console.error("=== LOGIN ERROR ===");
    console.error("Error:", error);
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