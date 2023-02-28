import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function Random() {
    const { data, error, isLoading, isValidating } = useSWR("/api/", fetcher)

    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Must Implement your API. Data is empty</h2>
        </>
    )
    let { name, sprite, types } = data
    console.log(data, name, sprite, types);

    return (
        <>
            <center>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            </center>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <div class = "poke-card">
                    <center>
                    <img src={sprite} />
                    <div class = "poke-card-text">
                    <h3>Name: {capitalize(name)}</h3>
                    <h3>Types: {types.map(type => <span>{capitalize(type)} </span>)}</h3>
                    </div>
                    </center>
                    
                    </div>
                </>
            )}
        </>
    )
}