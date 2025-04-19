import { useEffect, useState } from "react";
import axios from "axios";

function usePokemonSearch(searchTerm) {
    const [allPokemon, setAllPokemon] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    // Fetch Pokémon data with images
    useEffect(() => {
        async function fetchAllPokemon() {
            try {
                const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000");
                const names = await Promise.all(
                    res.data.results.map(async (p) => {
                        const detail = await axios.get(p.url);
                        return {
                            name: p.name,
                            id: p.url.split("/").filter(Boolean).pop(),
                            image: detail.data.sprites.front_default // Fetching the Pokémon image
                        };
                    })
                );
                setAllPokemon(names); // Set all Pokémon names and images
            } catch (error) {
                console.error("Error fetching Pokémon data", error);
            }
        }
        fetchAllPokemon();
    }, []);

    // Filter suggestions based on search term
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setSuggestions([]);
        } else {
            const filtered = allPokemon.filter(p =>
                p.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            ).slice(0, 10); // Limit to 10 suggestions
            setSuggestions(filtered);
        }
    }, [searchTerm, allPokemon]);

    return suggestions;
}

export default usePokemonSearch;
