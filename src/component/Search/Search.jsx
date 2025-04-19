import "./Search.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePokemonSearch from "../../hooks/usePokemonSearch";

function Search({ updateSearchTerm }) {
    const [searchTerm, setSearchTerm] = useState("");
    const suggestions = usePokemonSearch(searchTerm);
    const navigate = useNavigate();

    function handleSelectPokemon(id) {
        navigate(`/pokemon/${id}`);
        setSearchTerm("");
    }

    return (
        <div className="Search-box">
            <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    updateSearchTerm(e.target.value);
                }}
            />
            {suggestions.length > 0 && (
                <ul className="suggestion-list">
                    {suggestions.map(p => (
                        <li
                            key={p.id}
                            className="suggestion-item"
                            onClick={() => handleSelectPokemon(p.id)}
                        >
                            <img
                                src={p.image}
                                alt={p.name}
                                className="pokemon-image"
                            />
                            <span>{p.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Search;
