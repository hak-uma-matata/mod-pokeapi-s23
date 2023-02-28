//https://pokeapi.co/api/v2/evolution-chain/{id}/
import axios from "axios";
export default async function handler(req, res) {
    let response1;
    let response2;
    try {
        response1 = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + req.query.name);    
        response2 = await axios.get("https://pokeapi.co/api/v2/pokemon/" + req.query.name);    
    } catch (e) {
        console.log(e);
    }
    let evol = response1.data.evolution_chain.url;
    let sprite1 = response2.data.sprites.other['official-artwork'].front_default;

    try {
        response1 = await axios.get(evol);        
    } catch (e) {
        console.log(e);
        res.status(400).json();
    }
    let nextEvol = response1.data.chain.evolves_to[0].evolves_to[0].species.name;
    try {
        response2 = await axios.get("https://pokeapi.co/api/v2/pokemon/" + nextEvol);
    } catch {
        console.log(e);
        res.status(400).json();
    }
    let sprite2 = response2.data.sprites.other['official-artwork'].front_default;
    return res.status(200).json({sprite: sprite1, evolution: nextEvol, evol_sprite: sprite2});
}