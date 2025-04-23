import React, { useState ,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Welcome } from "../components/Welcome";
import { Trending } from "../components/Trending";
import { Recommend } from "../components/Recommend";
import { Cartoon } from "../components/Cartoon";
import { AnimatePresence } from 'framer-motion';

function MainPage({ movieRef, cartoonRef }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    window.addEventListener('scroll' , toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sectionId = params.get("scrollTo");

    if (sectionId === "movies" && movieRef?.current) {
      setTimeout(() => {
        movieRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }

    if (sectionId === "cartoons" && cartoonRef?.current) {
      setTimeout(() => {
        cartoonRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location, movieRef, cartoonRef]);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed bottom-4 right-4 z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-none text-white border border-white p-3 text-2xl flex justify-center items-center rounded-full shadow-lg w-12 h-12"
              aria-label="Scroll to top"
            >
              ↑
            </button>
          </motion.div>
        )}
      </AnimatePresence>
        <Welcome />
      <div id="movies" ref={movieRef}>
        <Trending />
        <Recommend />
      </div>
      <div id="cartoons" ref={cartoonRef}>
        <Cartoon />
      </div>
    </>
  );
}

export { MainPage };