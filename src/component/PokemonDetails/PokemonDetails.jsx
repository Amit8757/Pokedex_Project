import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './PokemonDetails.css';
import useSimilarPokemon from "../../hooks/useSimilarPokemon";



function PokemonDetails() {
    const { id } = useParams();
    const [Pokemon, setPokemon] = useState({});
    const [mainType, setMainType] = useState(null); // to pass to similar pokemon hook

    // Fetch details of selected Pokémon
    async function DownloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = response.data;
        

        const types = data.types.map(t => t.type.name);
        const firstType = types[0]; // choose primary type for similar

        setPokemon({
            name: data.name,
            image: data.sprites.other.dream_world.front_default,
            weight: data.weight,
            height: data.height,
            types: types
        });

        setMainType(firstType); // update mainType to use in similar hook
    }

    // Fetch Pokémon details on mount
    useEffect(() => {
        DownloadPokemon();
    }, [id]);

    // Custom hook to get similar Pokémon
    const { similarPokemon, loading } = useSimilarPokemon(mainType);

    return (
        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={Pokemon.image} alt={Pokemon.name} />
            <div className="pokemon-details-name">Name: {Pokemon.name}</div>
            <div>Height: {Pokemon.height}</div>
            <div>Weight: {Pokemon.weight}</div>
            <div className="pokemon-details-types">
                {Pokemon.types && Pokemon.types.map((t) => <div key={t}>Type: {t}</div>)}
            </div>

            {/* Similar Pokémon Section */}
            <div className="similar-pokemon-section">
                <h3>Similar Pokémon (Type: {mainType})</h3>
                {loading ? (
                    <p>Loading similar Pokémon...</p>
                ) : (
                    <div className="similar-pokemon-list">
                    {similarPokemon.map(p => (
                        <Link to={`/pokemon/${p.id}`} key={p.id} className="similar-pokemon-card">
                            <img src={p.image} alt={p.name} />
                            <p>{p.name}</p>
                        </Link>
                     ))}
                    </div>
                
                )}
            </div>
        </div>
    );
}

export default PokemonDetails;

