//https://pokeapi.co/api/v2/evolution-chain/{id}/
import axios from "axios";
export default async function handler(req, res) {
    let response;
    try {
        response = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + req.query.name);        
    } catch (e) {
        console.log(e);
    }
    let evol = response.data.evolution_chain.url;
    try {
        response = await axios.get(evol);        
    } catch (e) {
        console.log(e);
    }
    let nextEvol = response.data.chain.evolves_to[0].evolves_to[0].species.name;
    return res.send({evolution: nextEvol});
}