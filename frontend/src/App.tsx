import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import Topics from './pages/Topics/Topics';
import Topic from './pages/Topic/Topic';
import CreatePost from './pages/CreatePost/CreatePost';
import SearchResults from './pages/SearchResults/SearchResults';
import PostDetail from './pages/PostDetail/PostDetail';
import FolderView from './pages/FolderView/FolderView';
import { ToastProvider } from './contexts/ToastContext';
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <ToastProvider>
      <Routes>

        {/*  ❌ Login y Register SIN Layout */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*  ✔ Todas las otras rutas con Layout */}
        <Route
          path="/home"
          element={
            <Layout>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/topics"
          element={
            <Layout>
              <Topics />
            </Layout>
          }
        />

        <Route
          path="/topic/:id"
          element={
            <Layout>
              <Topic />
            </Layout>
          }
        />

        <Route
          path="/topic/:topicId/folder/:folderName"
          element={
            <Layout>
              <FolderView />
            </Layout>
          }
        />

        <Route
          path="/create-post"
          element={
            <Layout>
              <CreatePost />
            </Layout>
          }
        />

        <Route
          path="/search"
          element={
            <Layout>
              <SearchResults />
            </Layout>
          }
        />

        <Route
          path="/post/:id"
          element={
            <Layout>
              <PostDetail />
            </Layout>
          }
        />

      </Routes>
    </ToastProvider>
  );
}

export default App;

