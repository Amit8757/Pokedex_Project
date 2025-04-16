import { Link } from 'react-router-dom';
import'./Pokemon.css'

function Pokemon({name, image , id}){
    return(
            <div className='pokemon'>
              <Link to ={`/Pokemon/${id}`}>
                <div className='pokemon-Name' > {name}</div>
                <div><img src={image} alt="" /></div>
              </Link>
            </div>
    )




}
export  default Pokemon;