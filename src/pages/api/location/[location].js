import axios from "axios";
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
export default async function handler(req, res) {
    let response;
    try {
        response = await axios.get("https://pokeapi.co/api/v2/pokemon-habitat/" + req.query.location);        
    } catch (e) {
        console.log(e);
        res.status(400).json();
    }
    let data = response.data.pokemon_species;
   return res.status(200).json({species: data});
   
}
