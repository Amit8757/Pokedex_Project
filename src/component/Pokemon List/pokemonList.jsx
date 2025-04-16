import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../pokemon/pokemon";
import "../Pokemon List/pokemonList.css"

function PokemonList(){
    
    const [pokemonList , setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [Pokedex_URL ,setPokedexURL] = useState('https://pokeapi.co/api/v2/pokemon'); //API URL

    const [nextURL ,setNextUrl]= useState();
    const [prevURL ,setPrevUrl] = useState();

    async function downloadPokemon(){
        setIsLoading(true);

        const response = await axios.get(Pokedex_URL) //fetching data from API
        
        const pokemonResult = response.data.results;  //getting the results from the response

        console.log(response.data) //logging the response data
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        
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
         
    } , [Pokedex_URL]);
    
    return <div className="Pokemon-list-wrapper">
                <div className="Pokemon-wrapper">
                    {(isLoading) ? 'Loading....':
                    pokemonList.map((p)=> <Pokemon name = {p.name} image = {p.image} key = {p.id} id = {p.id} />)
                    }
                </div>
                <div className="controls">
                    <button disabled ={prevURL == null} onClick ={() => setPokedexURL(prevURL)}>  Prev</button>
                    <button disabled = {nextURL == null} onClick = {() => setPokedexURL(nextURL)} >Next</button>
                </div>
            </div>
}

export default PokemonList;