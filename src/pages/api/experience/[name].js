
import axios from "axios";
export default async function handler(req, res) {
    let response;
    let pic;
    try {
        response = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + req.query.name); 
        pic = await axios.get("https://pokeapi.co/api/v2/pokemon/" + req.query.name);       
    } catch (e) {
        console.log(e);
    }
    try {
        response = await axios.get(response.data.growth_rate.url);
    } catch (e) {
        console.log(e);
        res.status(400).json();
    }
    let level = req.query.level;
    let exp = response.data.levels[level - 1].experience;
    pic = pic.data.sprites.other['official-artwork'].front_default;
    
    return res.status(200).json({sprite: pic, experience: exp});
}
