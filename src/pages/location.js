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
    const inp = useRef(null)
    const [loc, setLoc] = useState("cave")
    const clicker = () => {
        setLoc(inp.current.value)
    }
    const { data, error, isLoading, isValidating } = useSWR(`/api/location/${loc}`, fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Not valid location.</h2>
        </>
    )
    let { species } = data

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
                            <input class = "input" placeholder = "Enter location..." type = "text" ref = {inp}/>
                        </label>
                        <input class = "search" type = "button" value = "Search" onClick = {clicker}/>
                    </form>
                    <h3>Location: {capitalize(loc)}</h3>
                    <ul class = "type-list">{species.map(poke => <li>{capitalize(poke.name)}</li>)}</ul>
                </>
            )}
            </center>
        </>
    )
}