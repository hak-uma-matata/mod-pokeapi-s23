// https://pokeapi.co/api/v2/pokemon/{id or name}/
import axios from "axios";
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
export default async function handler(req, res) {
    let response;
    try {
        response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + req.query.name);        
    } catch (e) {
        console.log(e);
        res.status(400).json();
    }
    let data = response.data;
    data.types = data.types.map((type) => {
        return capitalize(type.type.name);
    });
    return res.status(200).json({pokemonName: capitalize(data.name), sprite: data.sprites.other['official-artwork'].front_default, types: data.types});
}