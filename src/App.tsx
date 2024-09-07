import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import SignUp from './pages/signup';
import { Toaster } from 'react-hot-toast';
import Auth from './pages/auth';
import Resumi from './pages/resumi';
import { useState } from 'react';

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home search={search} setSearch={setSearch} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Auth />}>
          <Route path="/resumi" element={<Resumi />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
