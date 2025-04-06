import React from "react";
import { Welcome } from "../components/Welcome";
import { Trending } from "../components/Trending";
import { Recommend } from "../components/Recommend";
import { Cartoon } from "../components/Cartoon";

function MainPage({ movieRef, cartoonRef }) {
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
