import express from "express";
import fs from "fs";
import crypto from "crypto";

const router = express.Router();
const COMMENTS_FILE = "./comments.json";

// ---- Helpers ---- //
const getComments = () => {
  if (!fs.existsSync(COMMENTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(COMMENTS_FILE));
};

const saveComments = (comments) => {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
};

// ---- Recursively build a reply tree ---- //
const buildTree = (comments, parentId = null) => {
  return comments
    .filter((c) => c.parentId === parentId)
    .map((comment) => ({
      ...comment,
      replies: buildTree(comments, comment.id), // recursion
    }));
};

// ---- GET comments for a post (tree) ---- //
router.get("/post/:postId", (req, res) => {
  const { postId } = req.params;
  const comments = getComments();

  const forPost = comments.filter((c) => c.postId === postId);

  // armamos árbol
  const tree = buildTree(forPost);

  res.json(tree);
});

// ---- POST new comment or reply ---- //
router.post("/", (req, res) => {
  const { postId, user, content, parentId } = req.body;

  if (!postId || !user || !content) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  const comments = getComments();

  const newComment = {
    id: crypto.randomUUID(),
    postId,
    parentId: parentId || null, // si existe, es reply; si no, es comment raíz
    user,
    content,
    likes: 0,
    dislikes: 0,
    createdAt: new Date().toISOString(),
  };

  comments.push(newComment);
  saveComments(comments);

  res.status(201).json(newComment);
});

// ---- GET a single comment (with full reply chain) ---- //
router.get("/single/:commentId", (req, res) => {
  const { commentId } = req.params;
  const comments = getComments();

  const target = comments.find((c) => c.id === commentId);
  if (!target) {
    return res.status(404).json({ message: "Comentario no encontrado" });
  }

  // armamos árbol solo bajo este comment
  const samePost = comments.filter((c) => c.postId === target.postId);
  const tree = buildTree(samePost, commentId);

  res.json({
    ...target,
    replies: tree,
  });
});

// ---- PATCH add like ---- //
router.patch("/:id/like", (req, res) => {
    const { id } = req.params;
    const comments = getComments();
  
    const comment = comments.find((c) => c.id === id);
    if (!comment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
  
    comment.likes = (comment.likes || 0) + 1;
    saveComments(comments);
  
    res.json({ id: comment.id, likes: comment.likes });
  });
  
  // ---- PATCH add dislike ---- //
  router.patch("/:id/dislike", (req, res) => {
    const { id } = req.params;
    const comments = getComments();
  
    const comment = comments.find((c) => c.id === id);
    if (!comment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
  
    comment.dislikes = (comment.dislikes || 0) + 1;
    saveComments(comments);
  
    res.json({ id: comment.id, dislikes: comment.dislikes });
  });
  

export default router;
