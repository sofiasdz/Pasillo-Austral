const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// endpoint de prueba
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API running" });
});

// endpoint ejemplo (foro)
app.get("/posts", (req, res) => {
  res.json([
    { id: 1, title: "Duda sobre límites", author: "Alumno" },
    { id: 2, title: "Ejercicios de integrales", author: "Ayudante" }
  ]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
