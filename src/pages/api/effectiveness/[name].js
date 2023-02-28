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
    let pic = data.sprites.other['official-artwork'].front_default;
    let urls = data.types.map((type) => {
        return type.type.url;
    });
    let damage;
    let response2;

    try {
        response2 = await axios.get(urls[0]);
    } catch (e) {
        console.log(e);
        res.status(400).json();
    }  
   damage = response2.data.damage_relations;
   return res.status(200).json({pokemon: data.name, sprite: pic, double_damage_f: damage.double_damage_from, double_damage_t: damage.double_damage_to, no_damage_t: damage.no_damage_to, no_damage_f: damage.no_damage_from});
}
