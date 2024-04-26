import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { user } from '$lib/server/schema';

let userNow: user;
let place_id;
export const load = async ({ locals: { supabase }, params, fetch }) => {

    place_id = params.slug;
    console.log("Place Id: ", place_id);
    let email = (await supabase.auth.getUser()).data.user?.email;

    console.log("Amar email hoilo")
    console.log(email)


    const ret0 = await fetch('/api/user/get', {
        method: 'POST',
        body: JSON.stringify({ email: email })
    });
    const res0 = await ret0.json()
    userNow = res0[0];

    // console.log("Ami holam");
    console.log(userNow)





    // const formData = new FormData();
    // formData.append('place_id', place_id);

    // console.log(JSON.stringify(formData))

    const ret = await fetch('/api/geoapify/details', {
        method: 'POST',
        body: JSON.stringify({ place_id: place_id })
    });
    const res = await ret.json()
    // console.log(res)

    const lat = res.features[0].properties.lat
    const lon = res.features[0].properties.lon
    // console.log(lat, lon)

    const ret2 = await fetch('/api/weather', {
        method: 'POST',
        body: JSON.stringify({ lat: lat, lon: lon })
    });
    let weatherData = await ret2.json()
    // console.log(weatherData)


    const ret3 = await fetch('/api/pollution', {
        method: 'POST',
        body: JSON.stringify({ lat: lat, lon: lon })
    });
    let pollutionData = await ret3.json()
    // console.log(pollutionData)

    const ret4 = await fetch('/api/review/get-place-review', {
        method: 'POST',
        body: JSON.stringify({ placeId: place_id })
    });
    let allReviews = await ret4.json()




    return { res, weatherData, pollutionData, allReviews };
}
export const actions = {
    query: async (event) => {
        console.log("backend");
        const data = await event.request.formData();

        // data.append('categories', 'education, commercial');
        console.log(data.get("categories"))


        let queryData = Object.fromEntries(data.entries()) as any;
        queryData.append('reviewerId', userNow.userId)
        queryData.append('placeId', place_id)

        console.log(queryData)

        await event.fetch('/api/review/add', {
            method: 'POST',
            body: queryData
        })



        // let lat = queryData.lat;
        // let lon = queryData.lon;
        // let rng = queryData.rng;

        // const ret = await event.fetch('/api/geoapify/radius-search', {
        //     method: 'POST',
        //     body: JSON.stringify(queryData)
        // });
        // const res = await ret.json()
        // // console.log(res)

        return {
            success: 'done',

        };


        // // throw redirect(303, '/auth/search');

    },
} satisfies Actions