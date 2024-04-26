import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const apiKey = process.env.WeatherAPI!

    const lat = 23.9481
    const long = 90.3793
    // const categories = data["categories"]
    // const radius = data["rng"]

    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}&aqi=no`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    console.log(weatherData);
    // return new Response(
    //     res
    // )
}