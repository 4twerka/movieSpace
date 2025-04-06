import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Welcome } from "../components/Welcome";
import { Trending } from "../components/Trending";
import { Recommend } from "../components/Recommend";
import { Cartoon } from "../components/Cartoon";

function MainPage({ movieRef, cartoonRef }) {
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
