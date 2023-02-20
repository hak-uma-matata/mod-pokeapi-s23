import axios from "axios";
export default async function handler(req, res) {
    let response1, response2;
    let pokemon1 = req.body.pokemon1;
    let pokemon2 = req.body.pokemon2;
    try {
        response1 = await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon1); 
        response2 = await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon2);       
    } catch (e) {
        console.log(e);
    }
    let pokemon1data = response1.data.stats[0].base_stat;
    let pokemon2data = response2.data.stats[0].base_stat;
    if (pokemon2data > pokemon1data) {
        return res.send({winner: pokemon2});
    }
    return res.send({winner: pokemon1});
    
}