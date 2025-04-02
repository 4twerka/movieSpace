import { Car, DivideCircle } from "lucide-react";
import React from "react";
import { Welcome } from "../components/Welcome";
import { Trending } from "../components/Trending";
import { Recommend } from "../components/Recommend";
import { Cartoon } from "../components/Cartoon";

function MainPage() {
    return (
        <>
            <Welcome />
            <Trending />
            <Recommend />
            <Cartoon />
        </>
    );
}

export { MainPage };