import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './PokemonDetails.css';

function PokemonDetails(){
    const {id} = useParams();
    const [Pokemon ,setPokemon] = useState({});
    async function DownloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(response.data)
        setPokemon({
            name : response.data.name,
            image : response.data.sprites.other.dream_world.front_default,
            weight : response.data.weight,
            height : response.data.height,
            types : response.data.types.map((t) => t.type.name)
        })


    }

    useEffect (() => {
        DownloadPokemon();


    }, []);
    
    return (
        <div className="pokemon-details-wrapper">
           <img className="pokemon-details-image" src={Pokemon.image} />
           <div className="pokemon-details-name"> name :{ Pokemon.name} </div>
           <div>Height : {Pokemon.height}</div>
           <div>Weight : {Pokemon.weight}</div>
           <div className="pokemon-details-types">
               {Pokemon.types && Pokemon.types.map((t) => <div key={t}> {t} </div> )}
           </div>
        </div>
    )
}

export default PokemonDetails;
