
import { useEffect, useState } from "react";
import axios from "axios";

// Custom hook to fetch paginated list of Pokémon
function usePokemonList(url) {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        Pokedex_URL: url,
        nextURL: '',
        prevURL: ''
    });

    // Function to download list of Pokémon from current URL
    async function downloadPokemon() {
        setPokemonListState((state) => ({
            ...state,
            isLoading: true
        }));

        try {
            const response = await axios.get(pokemonListState.Pokedex_URL);
            const pokemonResult = response.data.results;

            // Set next and previous URLs for pagination
            setPokemonListState((state) => ({
                ...state,
                nextURL: response.data.next,
                prevURL: response.data.previous
            }));

            // Fetch details of each Pokémon in the list
            const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));
            const pokemonData = await axios.all(pokemonResultPromise);

            const pokeListResult = pokemonData.map((pokeData) => {
                const pokemon = pokeData.data;
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other.dream_world.front_default,
                    types: pokemon.types
                };
            });

            setPokemonListState((state) => ({
                ...state,
                pokemonList: pokeListResult,
                isLoading: false
            }));
        } catch (error) {
            console.error("Error fetching Pokémon list:", error);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [pokemonListState.Pokedex_URL]);

    return { pokemonListState, setPokemonListState };
}

export default usePokemonList;
