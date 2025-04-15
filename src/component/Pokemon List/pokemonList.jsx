import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../pokemon/pokemon";
import "./pokemonList.css"

function PokemonList(){
    
    const [pokemonList , setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon' //API URL

    async function downloadPokemon(){
        const response = await axios.get(POKEDEX_URL) //fetching data from API
        
        const pokemonResult = response.data.results;  //getting the results from the response

        console.log(response.data) //logging the response data
        
        // iterating over the array of pokemons,and using their url ,to create an array of promises
        // that will download those 20 pokemons
        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));

        //passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); //array of 20 pokemon detailed data 

        console.log(pokemonData);

        //now iterate on data of each pokemon,and extraxt id,name,image,types
        const pokeListResult = (pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image : pokemon.sprites.other.dream_world.front_default,
                    types: pokemon.types}
        }));
        console.log(pokeListResult);
        setPokemonList(pokeListResult);
        setIsLoading(false);
    }
    
    useEffect(() => {
        console.log("data fetched")
         downloadPokemon();
         
    } , []);
    
    return <div className="Pokemon-list-wrapper">
                <div className="Pokemon_lis"> Pokemon List </div> 
                {(isLoading) ? 'Loading....':
                pokemonList.map((p)=> <Pokemon name = {p.name} image = {p.image} key = {p.id} />)
                }
            </div>
}

export default PokemonList;