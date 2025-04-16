import './App.css';
import { Link } from 'react-router-dom';
import Pokedex from './component/Pokedex/Pokedex'
import PokemonList from './component/Pokemon List/pokemonList'
import CustomRoutes from './Routes/CustomRoutes';

function App() {
  

  return (
    <div className='outer-pokedex'>
      <h1 id="pokedex-heading">
       <Link to = '/'>Pokedex</Link> 
      </h1>
      <CustomRoutes />
    </div>
  )
}

export default App;
