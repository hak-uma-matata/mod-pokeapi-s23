import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import {useRef, useState} from 'react'

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const fetcher = async (url) => {
    const res = await axios.post(url[0], {
        pokemon: url[1],
        ball: url[2]
    })
    return res.data
}

export default function Battle() {
    const inp1 = useRef(null)
    const inp2 = useRef(null)
    const [pokemon, setName] = useState("pikachu")
    const [ball, setBall] = useState("safari")
    const clicker = () => {
        setName(inp1.current.value)
        setBall(inp2.current.value)
    }
    const { data, error, isLoading, isValidating } = useSWR([`/api/catch/`, pokemon, ball], fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Not a valid pokemon and/or ball.</h2>
        </>
    )
    let { sprite, caught } = data

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
                            <input class = "input" placeholder = "Enter pokemon..." type = "text" ref = {inp1} id = "input1"/>
                            <input class = "input" placeholder = "Enter ball..." type = "text" ref = {inp2}/>
                        </label>
                        <input class = "search" type = "button" value = "Search" onClick = {clicker}/>
                    </form>
                    <h2>Catching: {capitalize(pokemon)} with {capitalize(ball)} ball</h2>
                    {caught ? (
                        <h2>{capitalize(pokemon)} has been caught!</h2>
                    ) : (
                        <>
                            <div class = "poke-card">
                            <img src={sprite} />
                            <div class = "poke-card-text">
                            <h2>{capitalize(pokemon)} broke free!</h2>
                            </div>
                            </div>
                        </>
                    )}
                </>
            )}
            </center>
        </>
    )
}