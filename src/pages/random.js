import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
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
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Name: {name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                    <img src={sprite} />
                    <h2>Types: {types.map(type => <span>{type.charAt(0).toUpperCase() + type.slice(1)} </span>)}</h2>
                </>
            )}
        </>
    )
}