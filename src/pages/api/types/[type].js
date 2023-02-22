//https://pokeapi.co/api/v2/type/{id or name}/
import axios from "axios";
export default async function handler(req, res) {
    let response;
    try {
        response = await axios.get("https://pokeapi.co/api/v2/type/" + req.query.type);        
    } catch (e) {
        console.log(e);
    }
    console.log(response.data);
    let data = response.data.pokemon;
    data = data.map((poke) => {
        return poke.pokemon.name;
    });
    return res.send({pokemon: data});
    
}