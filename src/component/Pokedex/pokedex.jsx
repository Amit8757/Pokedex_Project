import { useState } from "react";
import PokemonList from "../Pokemon List/pokemonList";
import Search from "../Search/Search";
import "./pokedex.css"
function Pokedex(){


    const [searchTerm , setSearchTerm ] = useState('');
    return (
     <div className="pokedex-wrapper">
            
        <Search updateSearchTerm ={setSearchTerm} />
        {(searchTerm.length == 0) ? <PokemonList /> : ''}
        
           
     </div>
    )
}                                                       


export default Pokedex;