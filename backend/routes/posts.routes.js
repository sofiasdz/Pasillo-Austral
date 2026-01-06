import express from "express";
import fs from "fs";
import crypto from "crypto";

const router = express.Router();

const POSTS_FILE = "./posts.json";

// helpers
const getPosts = () => {
  if (!fs.existsSync(POSTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(POSTS_FILE));
};

const savePosts = (posts) => {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
};

// GET all posts
router.get("/", (req, res) => {
  const posts = getPosts();
  res.json(posts);
});


router.post("/", (req, res) => {
  const { user, topic, title, content, tags } = req.body;

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
    tags: tags || [],
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);
  savePosts(posts);

  res.status(201).json(newPost);
});

router.get("/topic/:topic", (req, res) => {
    const { topic } = req.params;
    const posts = getPosts();
  
    const filtered = posts.filter(
      (post) => post.topic.toLowerCase() === topic.toLowerCase()
    );
  
    res.json(filtered);
  });

export default router;

