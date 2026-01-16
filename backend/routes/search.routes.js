import express from "express";
import fs from "fs";

const router = express.Router();

const POSTS_FILE = "./posts.json";
const TOPICS_FILE = "./topics.json";
const MATERIALS_FILE = "./materials.json";
const COMMENTS_FILE = "./comments.json";

// Helper to load JSON safely
const load = (file) => {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file));
};

// Case-insensitive contains
const match = (str, q) =>
  str?.toString().toLowerCase().includes(q.toLowerCase());

router.get("/", (req, res) => {
  const q = req.query.q;
  if (!q || q.trim() === "") {
    return res.json({
      posts: [],
      topics: [],
      materials: [],
      comments: [],
    });
  }

  const posts = load(POSTS_FILE);
  const topics = load(TOPICS_FILE);
  const materials = load(MATERIALS_FILE);
  const comments = load(COMMENTS_FILE);

  // POSTS
  const matchedPosts = posts.filter(
    (p) =>
      match(p.title, q) ||
      match(p.content, q) ||
      (p.tags && p.tags.some((tag) => match(tag, q)))
  );

  // TOPICS
  const matchedTopics = topics.filter(
    (t) => match(t.title, q) || match(t.description || "", q)
  );

  // MATERIALS
  const matchedMaterials = [];
  materials.forEach((topic) => {
    topic.folders?.forEach((folder) => {
      folder.files?.forEach((file) => {
        const name = file.name || file;
        if (match(name, q)) {
          matchedMaterials.push({
            topic: topic.title || topic.name,
            folder: folder.name,
            file: name,
            path:
              file.path ||
              `/uploads/materials/${topic.id}/${folder.name}/${name}`,
          });
        }
      });
    });
  });

  // COMMENTS — enriquece con postTitle y topicName
  const matchedComments = comments
    .filter((c) => match(c.content || "", q))
    .map((c) => {
      const post = posts.find((p) => p.id === c.postId);
      return {
        ...c,
        postTitle: post?.title || "Publicación desconocida",
        topicName: post?.topic || "Tema desconocido",
      };
    });

  res.json({
    posts: matchedPosts,
    topics: matchedTopics,
    materials: matchedMaterials,
    comments: matchedComments,
  });
});

export default router;
