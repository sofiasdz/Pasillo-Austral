import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  author: string;
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Foro – Pasillo Austral</h1>

      {posts.length === 0 ? (
        <p>Cargando posts...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

