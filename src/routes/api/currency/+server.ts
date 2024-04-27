
import type { RequestHandler } from "@sveltejs/kit";
import * as dotenv from 'dotenv'
dotenv.config()

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const apiKey = process.env.amdorenAPI!

    const from = data["from"]
    const to = data["to"]

    const currencyURL = `https://www.amdoren.com/api/currency.php?api_key=${apiKey}&from=${from}&to=${to}`;
    const currencyResponce = await fetch(currencyURL);
    const currencyData = await currencyResponce.json();

    // console.log(weatherData);
    return new Response(

        JSON.stringify(currencyData)
    )
}