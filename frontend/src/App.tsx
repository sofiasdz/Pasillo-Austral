
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import Topics from './pages/Topics/Topics';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/topics" element={<Topics />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
      <ProtectedRoute>
     <Home/>
      </ProtectedRoute>
          }
          />
     
    </Routes>
  );
}

export default App;

