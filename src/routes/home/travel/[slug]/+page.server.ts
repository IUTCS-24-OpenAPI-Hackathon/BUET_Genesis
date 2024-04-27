export const load = async ({ locals: { supabase }, params, fetch }) => {
    const place_id = params.slug;

    // console.log(place_id)
    const ret = await fetch('/api/geoapify/details', {
        method: 'POST',
        body: JSON.stringify({ place_id: place_id })
    });
    const res = await ret.json()
    // console.log(res)

    const lat = res.features[0].properties.lat
    const lon = res.features[0].properties.lon
    const rad = 5;

    const ret1 = await fetch('/api/poi', {
        method: 'POST',
        body: JSON.stringify({ lat: lat, lon: lon, rad: rad })
    });
    const res1 = await ret1.json()

    console.log(res1)
}