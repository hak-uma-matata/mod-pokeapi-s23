//https://pokeapi.co/api/v2/evolution-chain/{id}/
import axios from "axios";
export default async function handler(req, res) {
    let response;
    try {
        response = await axios.get("https://pokeapi.co/api/v2/evolution-chain/" + req.query.name);        
    } catch (e) {
        console.log(e);
    }
    let data = response.data;
    data.types = data.types.map((type) => {
        return type.type.name;
    });
    console.log(data.name);
    return res.send({pokemonName: data.name, sprite: data.sprites.front_default, types: data.types});
}