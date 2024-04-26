<script lang="ts">
	// import Message from './Message.svelte';
	export let data;
	let features = data.features;

	// 	let { session, supabase, classNow, studclass } = data;
	// 	$: ({ session, supabase, classNow, studclass } = data);
</script>

<div class="mt-6 ml-6">
	<!-- <h1 class="font-extrabold text-xl">{data.res.features[0].properties.name}</h1> -->
	<!-- <div class="flex flex-row space-x-3">
		{#each data.res.features[0].properties.categories as category}
			<small class="chipi">
				{category}
			</small>
		{/each}
	</div> -->
	<div>
		<div class="m-2">
			<button on:click={history.back}>
				Go Back 
			</button>
		</div>
		<div class="flex justify-center ">
			<div class="w-9/10 md:w-4/5 xl:w-4/5">
				<p class="text-[45px] font-bold">{data.res.features[0].properties.name}</p>
				<p>{data.res.features[0].properties.address_line2}</p>
				<div class="flex space-x-2 mt-2">
					<p class="py-1 px-2 bg-gray-400 text-white ">{data.res.features[0].properties.categories[0]}</p>
					<p class="py-1 px-2 bg-gray-400 text-white">{data.res.features[0].properties.datasource.raw.amenity}</p>
				</div>

				<div class="mt-2">
					<p class="text-[22px]">Address:</p>
					<div class="ml-3">
						<p>Street : {data.res.features[0].properties.street}</p>
						<p>City : {data.res.features[0].properties.city}</p>
						<p>State : {data.res.features[0].properties.state}</p>
						<p>Country : {data.res.features[0].properties.country}</p>
						<p>Street : {data.res.features[0].properties.street}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	

</div>

<pre>{JSON.stringify(data.res, null, 2)}</pre>
<style>
.chipi {
    background-color: #c1d4e3;

    padding: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
}
</style>