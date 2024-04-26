<script lang="ts">
	// import Message from './Message.svelte';
	export let data;
	let features = data.res.features;

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
				<div class="ml-3">
					<p>
						Temperature: {data.weatherData.current.temp_c}°C (Feels like: {data.weatherData.current
							.feelslike_c}°C)
					</p>
					<p>Sky Condition: {data.weatherData.current.condition.text}</p>
					<p>Wind Velocity: {data.weatherData.current.wind_mph} mph</p>
					<p>
						Wind Direction: {data.weatherData.current.wind_degree}° {data.weatherData.current
							.wind_dir}
					</p>
				</div>
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
</div>
