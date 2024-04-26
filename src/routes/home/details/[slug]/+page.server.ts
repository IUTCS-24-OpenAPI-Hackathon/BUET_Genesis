import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async (event) => {

    const place_id = event.params.slug;
    console.log("param holo ", place_id);


    // const formData = new FormData();
    // formData.append('place_id', place_id);

    // console.log(JSON.stringify(formData))

    const ret = await event.fetch('/api/geoapify/details', {
        method: 'POST',
        body: JSON.stringify({ place_id: place_id })
    });
    const res = await ret.json()
    console.log(res)

    const lat = res.features[0].properties.lat
    const lon = res.features[0].properties.lon
    console.log(lat, lon)

    const ret2 = await event.fetch('/api/weather', {
        method: 'POST',
        body: JSON.stringify({ lat: lat, lon: lon })
    });
    let weatherData = await ret2.json()
    console.log(weatherData)


    const ret3 = await event.fetch('/api/pollution', {
        method: 'POST',
        body: JSON.stringify({ lat: lat, lon: lon })
    });
    let pollutionData = await ret3.json()
    console.log(pollutionData)




    return { res, weatherData, pollutionData };
}
export const actions = {
    query: async (event) => {
        console.log("backend");
        const data = await event.request.formData();
        // data.append('categories', 'education, commercial');
        console.log(data.get("categories"))


        let queryData = Object.fromEntries(data.entries()) as any;
        console.log(queryData)


        // let lat = queryData.lat;
        // let lon = queryData.lon;
        // let rng = queryData.rng;

        // const ret = await event.fetch('/api/geoapify/radius-search', {
        //     method: 'POST',
        //     body: JSON.stringify(queryData)
        // });
        // const res = await ret.json()
        // // console.log(res)

        // return {
        //     success: 'done',
        //     returned: res
        // };


        // // throw redirect(303, '/auth/search');

    },
} satisfies Actions