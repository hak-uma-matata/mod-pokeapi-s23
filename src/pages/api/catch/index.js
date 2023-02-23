import axios from "axios";

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export default async function handler(req, res) {
    let response;
    let pokemon = req.body.pokemon;
    console.log(pokemon);
    try {
        //response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon);  
    } catch (e) {
        console.log(e);
    }
    //let pokemonData = response.data.stats[0].base_stat;
    let HPMax = 100;
    let N = getRandom(1, 255);
    let BALL = getRandom(1, 255);
    let HPCurrent = getRandom(1, HPMax);
    let f = (HPMax * 255 * 4) / (HPCurrent * BALL);
    let ifCaught = (f >= N);
    return res.send({caught: ifCaught});
    
}