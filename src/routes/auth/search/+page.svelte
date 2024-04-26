<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	// import { enhance } from '$app/forms';
	// import { goto } from '$app/navigation';
	// import { onMount } from 'svelte';

	export let data: PageData;

	export let form: ActionData;

	let lat = 'Fetching...';
	let lon = 'Fetching...';
	let rng;
	let education;
	let commercial;

	// $: allproducts = data.allproducts;
	// $: allproducts = [...allproducts, ...newProducts];
	let locations;

	$: {
		// console.log(form?.success);
		locations = [];
		if (form?.success == 'done') {
			console.log(form.returned);
			form.success = '';
		}
		// console.log(newProducts);
	}
	// let categories = {
	// 	Fruits: ['Apple', 'Banana', 'Orange'],
	// 	Vegetables: ['Carrot', 'Tomato', 'Cucumber']
	// };
	// let activeCategory = null;

	// function toggleCategory(category) {
	// 	activeCategory = activeCategory === category ? null : category;
	// }

	// // Optional: Function to check at least one checkbox is selected
	// let isChecked = false;
	// function checkFormValidity() {
	// 	const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
	// 	isChecked = Array.from(allCheckboxes).some((checkbox) => checkbox.checked);
	// 	if (!isChecked) {
	// 		alert('Please select at least one option.');
	// 	}
	// }

	onMount(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					lat = position.coords.latitude;
					lon = position.coords.longitude;
				},
				(error) => {
					console.error(error);
					lat = 'Unable to fetch';
					lon = 'Unable to fetch';
				}
			);
		} else {
			lat = 'Geolocation is not supported by this browser.';
			lon = 'Geolocation is not supported by this browser.';
		}
	});
	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 10000);
	}
</script>

<div class="flex flex-col items-center justify-center mt-10">
	<form
		use:enhance
		action="?/query"
		method="POST"
		on:submit={() => {
			onSubmit();
		}}
	>
		<input
			required
			class="input input-bordered input-primary w-full max-w-xs"
			type="number"
			id="rng"
			name="rng"
			bind:value={rng}
			disabled={isLoading}
			placeholder="What is the Radius of search (in Km)"
		/>
		<input hidden type="text" id="lat" name="lat" bind:value={lat} disabled={isLoading} />
		<input hidden type="text" id="lon" name="lon" bind:value={lon} disabled={isLoading} />

		<button
			type="submit"
			class="btn btn-success rounded-lg text-xl font-semibold mt-2"
			disabled={isLoading}
		>
			{#if isLoading}
				<span class="loading loading-spinner loading-xs"></span>
			{/if}
			Submit
		</button>
	</form>
</div>

<h1>Your Current Location</h1>
<p>Latitude: {lat}</p>
<p>Longitude: {lon}</p>

<style>
	.dropdown-enter-active,
	.dropdown-leave-active {
		transition: height 0.5s ease;
	}
	.dropdown-enter, .dropdown-leave-to /* <- This is the starting point of the animation */ {
		height: 0;
		overflow: hidden;
	}
</style>
