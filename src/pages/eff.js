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
    const [name, setName] = useState("pikachu")
    const clicker = () => {
        setName(inp.current.value)
    }
    const { data, error, isLoading, isValidating } = useSWR(`/api/effectiveness/${name}`, fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Not valid pokemon.</h2>
        </>
    )
    let { pokemon, sprite, double_damage_f, double_damage_t, no_damage_f, no_damage_t } = data

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
                            <input class = "input" placeholder = "Enter pokemon..." type = "text" ref = {inp}/>
                        </label>
                        <input class = "search" type = "button" value = "Search" onClick = {clicker}/>
                    </form>
                    <div class = "poke-card">
                    <img src = {sprite}/>
                    <div class = "poke-card-text">
                    <h3>{capitalize(pokemon)}</h3>
                    <h3>Receives double damage from: {double_damage_f.map(type => <span>{capitalize(type.name)} </span>)}</h3>
                    <h3>Inflicts double damage on: {double_damage_t.map(type => <span>{capitalize(type.name)} </span>)}</h3>
                    <h3>Receives no damage from: {no_damage_f.map(type => <span>{capitalize(type.name)} </span>)}</h3>
                    <h3>Inflicts no damage on: {no_damage_t.map(type => <span>{capitalize(type.name)} </span>)}</h3>
                    </div>
                    </div>
                </>
            )}
            </center>
        </>
    )
}