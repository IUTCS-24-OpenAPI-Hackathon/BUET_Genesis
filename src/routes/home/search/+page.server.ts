
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

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

        const ret = await event.fetch('/api/geoapify/radius-search', {
            method: 'POST',
            body: JSON.stringify(queryData)
        });
        const res = await ret.json()
        // console.log(res)

        return {
            success: 'done',
            returned: res
        };


        // throw redirect(303, '/auth/search');

    },
} satisfies Actions