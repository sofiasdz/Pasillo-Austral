import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const router = express.Router();

// Fix dirname ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MATERIALS_FILE = path.join(__dirname, "../materials.json");

// Helpers
const getMaterials = () => {
  try {
    const data = fs.readFileSync(MATERIALS_FILE, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error leyendo materials.json:", error);
    return [];
  }
};

const saveMaterials = (data) => {
  fs.writeFileSync(MATERIALS_FILE, JSON.stringify(data, null, 2));
};

// =====================================
// 📥 Descargar archivo (real o mock)
// =====================================
router.get("/download/:filename", (req, res) => {
  const { filename } = req.params;

  const uploadsDir = path.join(__dirname, "../uploads");

  // 1️⃣ Si el archivo existe realmente -> descargarlo
  const directFilePath = path.join(uploadsDir, filename);
  if (fs.existsSync(directFilePath)) {
    return res.download(directFilePath);
  }

  // 2️⃣ Buscar último archivo real en uploads
  const files = fs
    .readdirSync(uploadsDir)
    .filter((f) => fs.lstatSync(path.join(uploadsDir, f)).isFile());

  if (files.length > 0) {
    const lastFile = files[files.length - 1];
    const lastFilePath = path.join(uploadsDir, lastFile);

    // Enviar como si fuera el nombre pedido
    return res.download(lastFilePath, filename);
  }

  // 3️⃣ No hay nada para devolver
  res.status(404).json({
    message: "No hay archivos reales para descargar aún",
  });
});

// =====================================
// 📂 Multer storage dinámico
// =====================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { topicId, folderName } = req.params;
    const uploadDir = path.join(
      __dirname,
      `../uploads/materials/${topicId}/${folderName}`
    );
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 🔥 Guardar con el nombre original sin modificar
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// =====================================
// GET MATERIALS by topic
// =====================================
router.get("/:topicId", (req, res) => {
  const { topicId } = req.params;
  const materials = getMaterials();

  const entry = materials.find((m) => m.topicId === Number(topicId));
  res.json(entry || { topicId: Number(topicId), folders: [] });
});

// =====================================
// Crear carpeta
// =====================================
router.post("/:topicId/folders", (req, res) => {
  const { topicId } = req.params;
  const { folderName } = req.body;

  if (!folderName) {
    return res.status(400).json({ message: "Falta folderName" });
  }

  const materials = getMaterials();
  let entry = materials.find((m) => m.topicId === Number(topicId));

  if (!entry) {
    entry = { topicId: Number(topicId), folders: [] };
    materials.push(entry);
  }

  if (entry.folders.some((f) => f.name === folderName)) {
    return res.status(400).json({ message: "La carpeta ya existe" });
  }

  entry.folders.push({ name: folderName, files: [] });

  saveMaterials(materials);
  res.status(201).json(entry);
});

// =====================================
// ⬆️ Subir archivo real a carpeta
// =====================================
router.post(
  "/:topicId/folders/:folderName/files",
  upload.single("file"),
  (req, res) => {
    const { topicId, folderName } = req.params;
    const materials = getMaterials();

    const entry = materials.find((m) => m.topicId === Number(topicId));
    if (!entry) {
      return res.status(404).json({ message: "Topic no encontrado" });
    }

    const folder = entry.folders.find((f) => f.name === folderName);
    if (!folder) {
      return res.status(404).json({ message: "Carpeta no encontrada" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No se subió ningún archivo" });
    }

    const filePath = `/uploads/materials/${topicId}/${folderName}/${req.file.filename}`;

    folder.files.push({
      name: req.file.originalname,
      path: filePath,
      size: req.file.size,
      uploadedAt: new Date().toISOString(),
    });

    saveMaterials(materials);
    res.status(201).json(folder);
  }
);

export default router;

