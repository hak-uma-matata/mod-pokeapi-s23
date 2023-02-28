import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import {useRef, useState} from 'react'

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export default function Types() {
    const inp = useRef(null)
    const [type, setType] = useState("normal")
    const clicker = () => {
        setType(inp.current.value)
    }
    const { data, error, isLoading, isValidating } = useSWR(`/api/types/${type}`, fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Not a valid type.</h2>
        </>
    )
    let { pokemon } = data


    return (
        <>
            <center>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                <div class = "form-container">
                    <form>
                        <label>
                            <input class = "input" placeholder = "Enter type..." type = "text" ref = {inp}/>
                        </label>
                        <input class = "search" type = "button" value = "Search" onClick = {clicker}/>
                    </form>
                    </div>
                    <h2>Type: {type}</h2>
                <ul class = "type-list">{pokemon.map(poke => <li>{poke}</li>)}</ul>
                </>
            )}
            </center>
        </>
    )
}