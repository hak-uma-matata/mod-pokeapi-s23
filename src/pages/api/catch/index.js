import axios from "axios";

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export default async function handler(req, res) {
    let response;
    let pokemon = req.body.pokemon;
    let ball = req.body.ball;
    let balls = {
        "poke": 1,
        "great": 1.5,
        "ultra": 2,
        "master": 225,
        "safari": 1.5
    }
    try {
        response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon);  
    } catch (e) {
        console.log(e);
        res.status(400).json();
    }
    let pic = response.data.sprites.other['official-artwork'].front_default;
    let HPMax = response.data.stats[0].base_stat;
    let N = getRandom(1, 255);
    let BALL = balls[ball];
    let HPCurrent = getRandom(1, HPMax);
    let f = ((3 * HPMax - 2 * HPCurrent) * BALL / (3 * HPMax));
    let ifCaught = (f >= N);
    return res.status(200).json({sprite: pic, caught: ifCaught}); 
}