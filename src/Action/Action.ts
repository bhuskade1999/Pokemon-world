import axios from "axios";

export const fetchPokemonList = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=35`)
    let results = response.data;  
    return results;
};


export const fetchPokemon = async (id:Number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const response = await axios.get(url)
    let results = response.data;  
    return results;
};

export const fetchWithPegination = async (url:string) =>{
    const response = await axios.get(url)
    let results = response.data;  
    return results;
}



