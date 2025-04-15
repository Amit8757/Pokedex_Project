import'./Pokemon.css'

function Pokemon({name, image}){
    return(
            <div className='pokemon'>
                <div className='pokemon-Name' > {name}</div>
                <div><img src={image} alt="" /></div>
            </div>
    )




}
export  default Pokemon;