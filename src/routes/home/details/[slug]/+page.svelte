<script lang="ts">
	// import Message from './Message.svelte';
	import wind from '$lib/images/wind.png'

	export let data;
	let features = data.res.features;

	
	let stars = 0;
	let comment = '';

	function handleStarHover(value) {
		stars = value;
	}

	function handleStarLeave() {
		// Reset the stars to the previous value if the user leaves the star area without clicking
		stars = Math.round(stars);
	}

	function handleSubmit() {
		// You can handle form submission here
		console.log('Stars:', stars);
		console.log('Comment:', comment);
	}
	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 10000);
	}



	// 	let { session, supabase, classNow, studclass } = data;
	// 	$: ({ session, supabase, classNow, studclass } = data);
</script>

<div class="mt-6 mx-6">
	<div class="m-2">
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			on:click={() => window.history.back()}
		>
			Go Back
		</button>
	</div>
	<div class="flex justify-center">
		<div class="w-9/10 md:w-4/5 xl:w-4/5">
			<h1 class="text-3xl font-extrabold">{data.res.features[0].properties.name}</h1>
			<p class="text-xl">GMT {data.res.features[0].properties.timezone.offset_STD}</p>
			<p class="mt-2">{data.res.features[0].properties.address_line2}</p>
			<div class="flex space-x-2 mt-2">
				{#each data.res.features[0].properties.categories as category}
					{#if !category.includes('.')}
						<p class="py-1 px-2 bg-gray-400 text-white rounded">
							{category}
						</p>
					{/if}
				{/each}

				<!-- <p class="py-1 px-2 bg-gray-400 text-white rounded">
					{data.res.features[0].properties.datasource.raw.amenity}
				</p> -->
			</div>
			<!-- Address -->
			<div class="mt-4">
				<h2 class="text-lg font-medium">Address:</h2>
				<div class="ml-3">
					{#if data.res.features[0].properties.street}
					<p>Street: {data.res.features[0].properties.street}</p>
					{/if}
					{#if data.res.features[0].properties.city}
					<p>City: {data.res.features[0].properties.city}</p>
					{/if}
					{#if data.res.features[0].properties.state}
					<p>State: {data.res.features[0].properties.state}</p>
					{/if}
					{#if data.res.features[0].properties.country}
					<p>Country: {data.res.features[0].properties.country}</p>
					{/if}
					{#if data.res.features[0].properties.postal}
					<p>Postal Code: {data.res.features[0].properties.postal}</p>
					{/if}
				</div>
			</div>
			<!-- Weather -->
			<div class="mt-4">
				<h2 class="text-lg font-medium">Weather:</h2>
				

				<!-- Weather -->
				<div class="mt-2">
					<p class="text-[22px] font-medium">Weather:</p>
					<div class="ml-2">
			
						<div class="border-2 rounded-lg py-2">
							<div class="flex items-center">
								<img src={data.weatherData.current.condition.icon} alt="">
								<p>
									<span class="text-[25px]">{data.weatherData.current.temp_c}<sup>o</sup></span> <span> feels {data.weatherData.current.feelslike_c}<sup>o</sup></span>
							   	</p>
							</div>
							<div class="flex items-center space-x-2 mx-3">
								<img src={wind} alt="" class="w-5">

								<p>
									<span>{data.weatherData.current.wind_mph}mile/h</span>
									<span>{data.weatherData.current.wind_degree}<sup>o</sup> {data.weatherData.current.wind_dir}</span>
								</p>
							</div>
						</div>
					</div>

				</div>

				<!-- Air pollution -->
				
			</div>
			<!-- Air Quality -->
			<div class="mt-4">
				<h2 class="text-lg font-medium">Air Quality:</h2>
				<div class="ml-3">
					<p>Air Quality Index: {data.pollutionData.list[0].main.aqi}
					{#if data.pollutionData.list[0].main.aqi == 1}
						<span class="badge p-3 bg-green-500">Good</span>
					{:else if data.pollutionData.list[0].main.aqi == 2}
					<span class="badge p-3 bg-green-300">Fair</span>
					{:else if data.pollutionData.list[0].main.aqi == 3}
					<span class="badge p-3 bg-orange-300">Moderate</span>
					{:else if data.pollutionData.list[0].main.aqi == 4}
					<span class="badge p-3 bg-red-300">Poor</span>
					{:else if data.pollutionData.list[0].main.aqi == 5}
					<span class="badge p-3 bg-red-500">Very Poor</span>
					{/if}
					</p>
				</div>
			</div>
		</div>
	</div>
	<form
		use:enhance
		action="?/query"
		method="POST"
		on:submit={() => {
			onSubmit();
		}}
	>
		<div class="max-w-lg mx-auto">
			<h1 class="text-3xl font-bold mb-6">Leave a Review</h1>

			<div class="flex items-center mb-4">
				<span class="mr-2 text-lg">Stars:</span>
				<div class="flex">
					{#each Array.from({ length: 5 }) as _, index}
						<svg
							class="star h-8 w-8 fill-current {index < stars ? 'star-filled' : ''}"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							on:click={() => handleStarHover(index + 1)}
							on:mouseover={() => handleStarHover(index + 1)}
							on:mouseleave={handleStarLeave}
						>
							<path d="M10 0l2.4 7.4H20l-6 4.6 2.3 7.4L10 15l-6 4.4 2.3-7.4-6-4.6h7.6L10 0z" />
						</svg>
					{/each}
				</div>
				<span class="ml-2">{stars}/5</span>
			</div>
			<input hidden type="number" id="stars" name="stars" bind:value={stars} disabled={isLoading} />

			<div class="mb-4">
				<label for="comment" class="text-lg block mb-2">Comment:</label>
				<textarea
					id="comment"
					name="comment"
					bind:value={comment}
					disabled={isLoading}
					placeholder="What is the Radius of search (in multiple of 100m)"
					class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
					rows="4"
				></textarea>
			</div>

			<button
				type="submit"
				class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
				on:click={handleSubmit}
			>
				Submit
			</button>
		</div>
	</form>
	

</div>

<pre>{JSON.stringify(data.res, null, 2)}</pre>
<pre>{JSON.stringify(data.weatherData, null, 2)}</pre>
<pre>{JSON.stringify(data.pollutionData, null, 2)}</pre>

<style>
	.chipi {
		background-color: #c1d4e3;

		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
	}
	.star {
		color: #fff8d2;
		cursor: pointer;
		transition: color 0.2s;
	}

	.star:hover {
		color: #f7d000;
	}

	.star-filled {
		color: #f7d000;
	}
</style>
