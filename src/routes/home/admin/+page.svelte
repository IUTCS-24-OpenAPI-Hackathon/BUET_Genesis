<script lang="ts">
	import _ from 'lodash'; // Import lodash library using default export
	const debounce = _.debounce; // Extract debounce function from lodash
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
    import wind from '$lib/images/wind.png'
	import type { ActionData, PageData } from './$types';
    import Slider from '$lib/components/Slider.svelte';

	// import { enhance } from '$app/forms';
	// import { goto } from '$app/navigation';
	// import { onMount } from 'svelte';

	export let data: PageData;

	export let form: ActionData;

    const Image_links = [
        "data:image/jpeg;base64,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"
        ,"data:image/jpeg;base64,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"
        ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp4dEDxgDnCRT5jfJRzzT1f8OJ9Tea1IIU1A&s"
    ]
    
</script>

<div class="w-full">
	<div class="w-full m-5">

        <p class="text-[30px]">Review Photos: </p>

        <div class="w-full flex justify-center">
            <div class="flex items-center justify-between p-4 border-2 border-blue-500 w-3/4">
                <div class="flex w-1/2 items-center ">
                    <div class="w-1/2">
                        <div class="w-full ">
                            <Slider imgs={Image_links} />
                        </div>
                    </div>
                    <div class="px-8">
                        <p class="text-[28px] font-semibold">Sony Cinema Hall</p>
                        <p class="text-[24px]">Mirpur-2, Dhaka</p>
                        <p>lat: 21.2, lon: 23.33</p>

                        <p>Uploaded By: Sakib</p>
                    </div>
                </div>
                <div class="">
                    <button class="border-red-500 border-2 m-2 p-2">Accept</button>
                    <button class="border-red-500 border-2 m-2 p-2">Decline</button>
                </div>
            </div>
        </div>

    </div>
</div>




<style>
	.toggle {
		position: relative;
		width: 60px;
		height: 30px;
		border-radius: 15px;
		background-color: #ccc;
		cursor: pointer;
	}

	.handle {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background-color: #fff;
		transition: transform 0.3s;
	}

	.toggle.on .handle {
		transform: translateX(30px);
	}
	.dropdown {
		position: relative;
	}

	.dropdown ul {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 1000;
		display: none;
		margin: 0;
		padding: 0;
		list-style: none;
		background-color: #fff;
		border: 1px solid #ccc;
		border-top: none;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.dropdown:hover ul {
		display: block;
	}

	.dropdown ul li {
		padding: 8px 16px;
		cursor: pointer;
	}

	.dropdown ul li:hover {
		background-color: #f4f4f4;
	}

	input:checked ~ .dot {
		transform: translateX(100%);
		background-color: #48bb78;
	}

	.dot {
		transition: transform 0.3s ease-in-out;
	}
</style>
