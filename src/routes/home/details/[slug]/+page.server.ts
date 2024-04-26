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





    return { res };
}