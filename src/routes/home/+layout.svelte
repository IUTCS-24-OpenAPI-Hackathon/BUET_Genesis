<script lang="ts">
	import { page } from '$app/stores';
    import logo from '$lib/images/voyager.png'

	$: pathName = $page.url.pathname as string;
</script>

<body class="inset-0 flex min-h-screen w-full flex-col bg-white">
	<nav class="flex w-full flex-wrap items-center justify-between bg-gray-800 p-6">
		<div class="mr-6 flex flex-shrink-0  items-center text-white">
			<img src={logo} width="50px" class="mb-1" alt="logo"/>
			<!-- <span class="text-3xl font-medium tracking-tight ml-5 mr-10"></span> -->
		</div>
		<div class="flex items-center">
			<div class="flex-grow text-sm">
				{#if pathName.includes('search')}
					<a
						href="/home/search"
						class="mr-4 text-base text-blue-200 underline hover:scale-125 hover:text-white"
					>
						Search
					</a>
				{:else}
					<a
						href="/home/search"
						class="mr-4 text-base text-blue-200 hover:scale-150 hover:text-white"
					>
                    Search
					</a>
				{/if}
				{#if pathName.includes('blog')}
					<a
						href="#responsive-header"
						class="mr-4 text-base text-blue-200 underline hover:scale-110 hover:text-white"
					>
						Blogs
					</a>
				{:else}
					<a
						href="#responsive-header"
						class="mr-4 text-base text-blue-200 hover:scale-110 hover:text-white"
					>
						Blogs
					</a>
				{/if}
			</div>
		</div>
	</nav>
    <slot />
</body>
