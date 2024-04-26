import type { RequestHandler } from "@sveltejs/kit";
import {getPlaceReview} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const res = await getBlog(data.placeId)

    // console.log(res);
    return new Response(
        JSON.stringify(res)
    )
}