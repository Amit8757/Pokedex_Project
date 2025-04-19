import Pokemon from "../pokemon/pokemon";
import "../Pokemon List/pokemonList.css"
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList(){
    
   const {pokemonListState, setPokemonListState} = usePokemonList('https://pokeapi.co/api/v2/pokemon');
//    const [typeFilter, setTypeFilter] = useState(""); // '' means show all

    
    return <div className="Pokemon-list-wrapper">
                <div className="Pokemon-wrapper">
                    {(pokemonListState.isLoading) ? 'Loading....':
                        pokemonListState.pokemonList.map((p)=>
                            <Pokemon name = {p.name} 
                                     image = {p.image} 
                                     key = {p.id} 
                                     id = {p.id} />
                    )}
                </div>

                <div className="controls">
                    <button disabled ={pokemonListState.prevURL == null} onClick ={() => {
                        const urlToSet = pokemonListState.prevURL;
                        setPokemonListState({...pokemonListState,Pokedex_URL: urlToSet})
                    }}>  Prev</button>
                    <button disabled = {pokemonListState.nextURL == null} onClick = {() => {
                        const urlToSet = pokemonListState.nextURL;
                         setPokemonListState({...pokemonListState,Pokedex_URL: urlToSet})
                         }}>Next</button>
                </div>
            </div>
}

export default PokemonList;