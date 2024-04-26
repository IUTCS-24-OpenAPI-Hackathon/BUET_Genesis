import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';

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