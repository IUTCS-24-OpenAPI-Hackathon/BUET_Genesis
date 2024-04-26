<script lang="ts">
	// import Message from './Message.svelte';
	export let data;
	let features = data.features;

	// 	let { session, supabase, classNow, studclass } = data;
	// 	$: ({ session, supabase, classNow, studclass } = data);
</script>

<div class="mt-6 ml-6">
	<h1 class="font-extrabold text-xl">{data.res.features[0].properties.name_international.en}</h1>
	<div class="flex flex-row space-x-3">
		{#each data.res.features[0].properties.categories as category}
			<small class="chipi">
				{category}
			</small>
		{/each}
	</div>

	<h1 class="font-extrabold text-xl">{data.res.features[0].properties.name_international.en}</h1>
	<h1 class="font-extrabold text-xl">{data.res.features[0].properties.name_international.en}</h1>
	<h1 class="font-extrabold text-xl">{data.res.features[0].properties.name_international.en}</h1>
	<h1 class="font-extrabold text-xl">{data.res.features[0].properties.name_international.en}</h1>
	<h1 class="font-extrabold text-xl">{data.res.features[0].properties.name_international.en}</h1>
	<h1 class="font-extrabold text-xl">{data.res.features[0].properties.name_international.en}</h1>
	<h1 class="font-extrabold text-xl">{data.res.features[0].properties.name_international.en}</h1>
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