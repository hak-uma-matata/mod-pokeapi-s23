import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import {useRef, useState} from 'react'

const fetcher = async (url) => {
    const res = await axios.get(url)
    console.log(res.data)
    return res.data
}

export default function Name() {
    const inp = useRef(null)
    const [name, setName] = useState("pikachu")
    const clicker = () => {
        setName(inp.current.value)
    }
    let { data, error, isLoading, isValidating } = useSWR(`/api/pokemon/${name}`, fetcher)

    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Not a valid name.</h2>
        </>
    )

    let { pokemonName, sprite, types } = data


    return (
        <>
            <center>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            </center>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <center>
                    <form>
                        <label>
                            <input class = "input" placeholder = "Enter pokemon..." type = "text" ref = {inp}/>
                        </label>
                        <input class = "search" type = "button" value = "Search" onClick = {clicker}/>
                    </form>
                    <div class = "poke-card">
                    <img src={sprite}/>
                    <div class = "poke-card-text">
                    <h2>Name: {pokemonName}</h2>                
                    <h2>Types: {types.map(type => <span>{type} </span>)}</h2>
                    </div>
                    </div>
                    </center>
                </>
            )}
        </>
    )
}