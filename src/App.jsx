import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from './components/Header'
import { MainPage } from './pages/MainPage'
import Footer from './components/Footer'
import { MoviePage } from './pages/MoviePage'
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/movie/:id" element={<MoviePage />}/>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
