
import axios from "axios";
export default async function handler(req, res) {
    let response;
    try {
        response = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + req.query.name);        
    } catch (e) {
        console.log(e);
    }
    try {
        response = await axios.get(response.data.growth_rate.url);
    } catch (e) {
        console.log(e);
    }
    let level = req.query.level;
    let exp = response.data.levels[level - 1].experience;
    
    /**
    let data = response.data;
    
    data.types = data.types.map((type) => {
        return type.type.name;
    });
    console.log(data.name); */
    return res.send({experience: exp});
}
