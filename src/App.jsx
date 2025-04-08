import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Header } from './components/Header';
import { MainPage } from './pages/MainPage';
import Footer from './components/Footer';
import { MoviePage } from './pages/MoviePage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ToastContainer } from "react-toastify";
import { auth } from './components/firebase';

function AppWrapper() {
  const movieRef = useRef(null);
  const cartoonRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (ref) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    });
  });

  return (
    <>
      <Header
        scrollToMovies={() => handleScroll(movieRef)}
        scrollToCartoons={() => handleScroll(cartoonRef)}
      />
      <Routes>
        <Route path="/" element={<MainPage movieRef={movieRef} cartoonRef={cartoonRef} />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={user ? <Navigate to="/profile" /> : <LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;