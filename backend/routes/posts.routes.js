import express from "express";
import fs from "fs";
import crypto from "crypto";
import multer from "multer";
import path from "path";

const router = express.Router();
const POSTS_FILE = "./posts.json";

// ---- Multer config ---- //
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // carpeta donde se guardan los archivos
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + crypto.randomUUID() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { files: 10 }, // máximo 10 archivos
});

// ---- Helper functions ---- //
const getPosts = () => {
  if (!fs.existsSync(POSTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(POSTS_FILE));
};

const savePosts = (posts) => {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
};

// ---- GET all posts ---- //
router.get("/", (req, res) => {
  const posts = getPosts();
  res.json(posts);
});

// ---- POST new post w/ optional files ---- //
router.post("/", upload.array("files", 10), (req, res) => {
  const { user, topic, title, content, tags } = req.body;
  const files = req.files || [];

  if (!user || !topic || !title || !content) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  const posts = getPosts();

  const newPost = {
    id: crypto.randomUUID(),
    user,
    topic,
    title,
    content,
    tags: tags ? JSON.parse(tags) : [], // por si te llega como string
    files: files.map((f) => ({
      filename: f.filename,
      original: f.originalname,
      mimetype: f.mimetype,
      size: f.size,
      url: `/uploads/${f.filename}`, // fácil para mostrar en frontend
    })),
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  savePosts(posts);

  res.status(201).json(newPost);
});

// ---- GET posts by topic ---- //
router.get("/topic/:topic", (req, res) => {
  const { topic } = req.params;
  const posts = getPosts();

  const filtered = posts.filter(
    (post) => post.topic.toLowerCase() === topic.toLowerCase()
  );

  res.json(filtered);
});

export default router;
