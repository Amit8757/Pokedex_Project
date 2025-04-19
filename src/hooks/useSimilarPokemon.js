import { useEffect, useState } from "react";
import axios from "axios";

// Custom hook to fetch similar Pokémon based on a specific type
function useSimilarPokemon(type) {
    const [similarPokemon, setSimilarPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!type) return;

        async function fetchSimilarPokemon() {
            setLoading(true);

            try {
                // Fetch Pokémon by type
                const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
                const pokemonEntries = response.data.pokemon.slice(0, 10); // limit to 10

                // Get detailed info for each similar Pokémon
                const pokemonDetailsPromises = pokemonEntries.map(p =>
                    axios.get(p.pokemon.url)
                );
                const responses = await Promise.all(pokemonDetailsPromises);

                const similarList = responses.map(res => {
                    const data = res.data;
                    return {
                        id: data.id,
                        name: data.name,
                        image: data.sprites.other.dream_world.front_default
                    };
                });

                setSimilarPokemon(similarList);
            } catch (err) {
                console.error("Failed to fetch similar Pokémon:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchSimilarPokemon();
    }, [type]);

    return { similarPokemon, loading };
}

export default useSimilarPokemon;
