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
	let rng: any;
	let education;
	let commercial;

	let locations: any = [];

	$: {
		// console.log(form?.success);
		locations = [];
		if (form?.success == 'done') {
			locations = form?.returned.features;
			console.log(locations);
			isLoading = false;
			form == null;
		}
	}

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

	let categories = '';
	let isEducationChecked = false;
	let isAccommodationChecked = false;
	let isActivityChecked = false;
	let isAirportChecked = false;
	let isCommercialChecked = false;
	let isCateringChecked = false;
	let isEntertainmentChecked = false;
	let isHealthCareChecked = false;
	let isHeritageChecked = false;
	let isNaturalChecked = false;
	let isSportChecked = false;

	function buildCategories() {
		categories = '';
		if (isEducationChecked) {
			categories += 'education,';
		}
		if (isAccommodationChecked) {
			categories += 'accommodation,';
		}
		if (isActivityChecked) {
			categories += 'activity,';
		}
		if (isAirportChecked) {
			categories += 'airport,';
		}
		if (isCommercialChecked) {
			categories += 'commercial,';
		}
		if (isCateringChecked) {
			categories += 'catering,';
		}
		if (isEntertainmentChecked) {
			categories += 'entertainment,';
		}
		if (isHealthCareChecked) {
			categories += 'healthcare,';
		}
		if (isHeritageChecked) {
			categories += 'heritage,';
		}
		if (isNaturalChecked) {
			categories += 'natural,';
		}
		if (isSportChecked) {
			categories += 'sport,';
		}
		if (categories.length > 0 && categories.endsWith(',')) {
			categories = categories.slice(0, -1);
		}
		console.log(categories);
	}

	function toggleEducationCheckbox() {
		isEducationChecked = !isEducationChecked;
		buildCategories();
	}

	function toggleAccommodationCheckbox() {
		isAccommodationChecked = !isAccommodationChecked;
		buildCategories();
	}

	function toggleActivityCheckbox() {
		isActivityChecked = !isActivityChecked;
		buildCategories();
	}

	function toggleAirportCheckbox() {
		isAirportChecked = !isAirportChecked;
		buildCategories();
	}

	function toggleCommercialCheckbox() {
		isCommercialChecked = !isCommercialChecked;
		buildCategories();
	}

	function toggleCateringCheckbox() {
		isCateringChecked = !isCateringChecked;
		buildCategories();
	}

	function toggleEntertainmentCheckbox() {
		isEntertainmentChecked = !isEntertainmentChecked;
		buildCategories();
	}

	function toggleHealthCareCheckbox() {
		isHealthCareChecked = !isHealthCareChecked;
		buildCategories();
	}

	function toggleHeritageCheckbox() {
		isHeritageChecked = !isHeritageChecked;
		buildCategories();
	}

	function toggleNaturalCheckbox() {
		isNaturalChecked = !isNaturalChecked;
		buildCategories();
	}

	function toggleSportCheckbox() {
		isSportChecked = !isSportChecked;
		buildCategories();
	}
</script>

<div class="flex flex-col items-center justify-center mt-10">
	<form
		use:enhance={() => {
			return async ({ update, result }) => {
				update({ reset: false, invalidateAll: false });
			};
		}}
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
			placeholder="What is the Radius of search (in multiple of 100m)"
		/>
		<input hidden type="text" id="lat" name="lat" bind:value={lat} disabled={isLoading} />
		<input hidden type="text" id="lon" name="lon" bind:value={lon} disabled={isLoading} />
		<input hidden type="text" id="categories" name="categories" bind:value={categories} />

		<div class="grid grid-cols-3 gap-4 mt-5">
			<label>
				<input type="checkbox" on:change={toggleEducationCheckbox} />
				Education
			</label>
			<label>
				<input type="checkbox" on:change={toggleAccommodationCheckbox} />
				Accommodation
			</label>
			<label>
				<input type="checkbox" on:change={toggleActivityCheckbox} />
				Activity
			</label>
			<label>
				<input type="checkbox" on:change={toggleAirportCheckbox} />
				Airport
			</label>
			<label>
				<input type="checkbox" on:change={toggleCommercialCheckbox} />
				Commercial
			</label>
			<label>
				<input type="checkbox" on:change={toggleCateringCheckbox} />
				Catering
			</label>
			<label>
				<input type="checkbox" on:change={toggleEntertainmentCheckbox} />
				Entertainment
			</label>
			<label>
				<input type="checkbox" on:change={toggleHealthCareCheckbox} />
				Health Care
			</label>
			<label>
				<input type="checkbox" on:change={toggleHeritageCheckbox} />
				Heritage
			</label>
			<label>
				<input type="checkbox" on:change={toggleNaturalCheckbox} />
				Natural
			</label>
			<label>
				<input type="checkbox" on:change={toggleSportCheckbox} />
				Sport
			</label>
		</div>

		<div class="flex flex-row justify-center mt-5">
			<button
				type="submit"
				class="btn bg-green-500 hover:bg-green-600 rounded-lg text-xl font-semibold mt-2"
				disabled={isLoading}
			>
				{#if isLoading}
					<span class="loading loading-spinner loading-xs"></span>
				{/if}
				Submit
			</button>
		</div>
	</form>
</div>

{#if locations.length > 0}
	<div class="grid grid-cols-3 gap-4 mt-5">
		{#each locations as location}
			{#if location.properties.name}
				<!-- <div class="border border-black m-5">
			<a href="./details/{location.properties.place_id}">
				{location.properties.city}
			</a>
		</div> -->
				<a href="./details/{location.properties.place_id}">
					<div
						class="border border-slate-300 border-rounded card w-96 bg-base-100 shadow-xl hover:scale-105 mx-5"
					>
						<div class="card-body">
							<h2 class="card-title">
								{location.properties.name}
							</h2>
							{#if location.properties.street}
								<p>Street: {location.properties.street}</p>
							{/if}
							{#if location.properties.suburb}
								<p>Suburb: {location.properties.suburb}</p>
							{/if}
							{#if location.properties.city}
								<p>City: {location.properties.city}</p>
							{/if}
							{#if location.properties.postcode}
								<p>Postcode: {location.properties.postcode}</p>
							{/if}

							<div class="card-actions justify-end">
								{#each location.properties.categories as category}
									{#if !category.includes('.')}
										<div class="badge badge-outline">{category}</div>
									{/if}
								{/each}
							</div>
						</div>
					</div>
				</a>
			{/if}
		{/each}
	</div>
{/if}

<!-- <h1>Your Current Location</h1>
<p>Latitude: {lat}</p>
<p>Longitude: {lon}</p> -->

<!-- 
name, street, suburb, city, postcode, categories(its an array)

-->

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
