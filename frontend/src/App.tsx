import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import Topics from './pages/Topics/Topics';
import Topic from './pages/Topic/Topic';
import CreatePost from './pages/CreatePost/CreatePost';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/register" element={<Register />} />
        <Route path="/topic/:id" element={<Topic />} />
        <Route path="/create-post" element={<CreatePost />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Catch-all, opcional */}
        {/* <Route path="*" element={<h1>404</h1>} /> */}
      </Routes>
    </ToastProvider>
  );
}

export default App;
