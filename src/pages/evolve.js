import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import {useRef, useState} from 'react'

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function Evolve() {
    const inp = useRef(null)
    const [name, setName] = useState("pikachu")
    const clicker = () => {
        setName(inp.current.value)
    }
    const { data, error, isLoading, isValidating } = useSWR(`/api/evolve/${name}`, fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Must Implement your API. Data is empty</h2>
        </>
    )
    let { sprite, evolution, evol_sprite } = data


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
                    </center>
                    <div class = "left-right-container">
                    <div class = "poke-card" id = "left-card">
                    <img src={sprite}/>
                    <h2 class = "poke-card-text">Name: {capitalize(name)}</h2>
                    </div>
                    <div class = "poke-card" id = "right-card">
                    <img src={evol_sprite}/>
                    <h2 class = "poke-card-text">Next Evolution: {capitalize(evolution)}</h2>
                    </div>
                    </div>
                </>
            )}
            
        </>
    )
}