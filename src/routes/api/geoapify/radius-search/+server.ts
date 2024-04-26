import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const apiKey = process.env.GEOAPIFY_API!

    const lat = data["latitude"]
    const long = data["longitude"]
    const categories = data["categories"]
    const radius = data["radius"]

    const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${long},${lat},${radius}&bias=proximity:${long},${lat}&limit=20&apiKey=${apiKey}`
    const ret = await fetch(url)

    console.log(url)

    return new Response(
        JSON.stringify(ret)
    )
}