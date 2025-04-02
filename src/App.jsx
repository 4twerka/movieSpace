import React from 'react'
import './App.css'
import { Header } from './components/Header'
import { MainPage } from './pages/MainPage'
import Footer from './components/Footer'
import { MoviePage } from './pages/MoviePage'

function App() {

  return (
    <>
      <Header />
      <MainPage />
      {/* <MoviePage /> */}
      <Footer />
    </>
  )
}

export default App
