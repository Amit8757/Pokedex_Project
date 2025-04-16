import { Routes, Route } from "react-router-dom";
import Pokedex from "../component/Pokedex/Pokedex";
import PokemonDetails from "../component/PokemonDetails/PokemonDetails";

function CustomRoutes() {
    return (
        <Routes>
            hello
            <Route path="/" element={<Pokedex />} />
            <Route path="/Pokemon/:id" element={<PokemonDetails />} />
        </Routes>
    );
}

export default CustomRoutes;
