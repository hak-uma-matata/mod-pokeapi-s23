import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import {useRef, useState} from 'react'

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const fetcher = async (url) => {
    const res = await axios.post(url[0], {
        pokemon1: url[1],
        pokemon2: url[2]
    })
    return res.data
}

export default function Battle() {
    const inp1 = useRef(null)
    const inp2 = useRef(null)
    const [poke1, setPoke1] = useState("pikachu")
    const [poke2, setPoke2] = useState("lucario")
    const clicker = () => {
        setPoke1(inp1.current.value)
        setPoke2(inp2.current.value)
    }
    const { data, error, isLoading, isValidating } = useSWR([`/api/battle/`, poke1, poke2], fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Not valid pokemon.</h2>
        </>
    )
    let { winner, sprite } = data

    return (
        <>
            <center>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <form>
                        <label>
                            <input class = "input" placeholder = "Enter pokemon 1..." type = "text" ref = {inp1} id = "input1"/>
                            <input class = "input" placeholder = "Enter pokemon 2..." type = "text" ref = {inp2}/>
                        </label>
                        <input class = "search" type = "button" value = "Search" onClick = {clicker}/>
                    </form>         
                    <h2>Battle: {capitalize(poke1)} vs. {capitalize(poke2)}</h2>
                    <div class = "poke-card">
                    <img src = {sprite}/>
                    <div class = "poke-card-text">
                    <h2>Winner: {capitalize(winner)}</h2>
                    </div>
                    </div>
                </>
            )}
            </center>
        </>
    )
}