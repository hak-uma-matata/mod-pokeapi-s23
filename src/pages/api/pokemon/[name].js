// https://pokeapi.co/api/v2/pokemon/{id or name}/
import axios from "axios";
export default async function handler(req, res) {
    console.log(req.query);
    res.send("2");
}