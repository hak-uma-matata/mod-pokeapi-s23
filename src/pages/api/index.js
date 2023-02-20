// https://pokeapi.co/api/v2/pokemon/{id or name}/
import axios from "axios";
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export default async function handler(req, res) {
    let response;
    try {
        response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + getRandom(1, 1009));        
    } catch (e) {
        console.log(e);
    }
    let data = response.data;
    data.types = data.types.map((type) => {
        return type.type.name;
    });
    return res.send({name: data.name, sprite: data.sprites.front_default, types: data.types});
}