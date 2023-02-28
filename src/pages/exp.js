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

export default function Exp() {
    const inp1 = useRef(null)
    const inp2 = useRef(null)
    const [name, setName] = useState("pikachu")
    const [level, setLevel] = useState(5)
    const clicker = () => {
        setName(inp1.current.value)
        setLevel(parseInt(inp2.current.value))
    }
    const { data, error, isLoading, isValidating } = useSWR(`/api/experience/${name}?level=${level}`, fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Not valid pokemon and level.</h2>
        </>
    )
    let { sprite, experience } = data

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
                            <input class = "input" placeholder = "Enter pokemon..." type = "text" id = "input1" ref = {inp1}/>
                            <input class = "input" placeholder = "Enter level..." type = "text" ref = {inp2}/>
                        </label>
                        <input class = "search" type = "button" value = "Search" onClick = {clicker}/>
                    </form>
                    <div class = "poke-card">
                        <img src = {sprite}/>
                        <div class = "poke-card-text">
                            <h3>Name: {capitalize(name)}</h3>
                            <h3>Level: {level}</h3>
                            <h3>Experience: {experience}</h3>
                        </div>
                    </div>
                </>
            )}
            </center>
        </>
    )
}