import { fail, redirect } from '@sveltejs/kit'
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';



export const load = async (event) => {
    // console.log(event.params.slug);


    const ret = await event.fetch('/api/unexplored/get', {
        method: 'POST',
        body: JSON.stringify({ blogid: event.params.slug })
    });
    const resx = await ret.json()
    // console.log(res);

    const res = resx[0];


    return { res };

}