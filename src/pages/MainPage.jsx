import { DivideCircle } from "lucide-react";
import React from "react";
import { Welcome } from "../components/Welcome";
import { Trending } from "../components/Trending";

function MainPage() {
    return (
        <>
            <Welcome />
            <Trending />
        </>
    );
}

export { MainPage };