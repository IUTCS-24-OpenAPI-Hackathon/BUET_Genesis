import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const searchText = encodeURIComponent(data["text"])
    const apiKey = process.env.GEOAPIFY_API!

    const ret = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&format=json&apiKey=${apiKey}`)

    return new Response(
        JSON.stringify(ret)
    )
}