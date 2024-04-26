<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { z } from 'zod';
	export let data: PageData;

	const userSchema = z.object({
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.max(256, { message: 'Email must be less than 256 characters' })
			.email({ message: 'Email must be a valid email address' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.regex(new RegExp('.*[A-Z].*'), 'Password must contain at least one uppercase character')
			.regex(new RegExp('.*[a-z].*'), 'Password must contain at least one lowercase character')
			.regex(new RegExp('.*\\d.*'), 'Password must contain at least one number')
			.regex(
				new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
				'Password must contain at least one special character'
			)
			.trim()
	});

	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		validators: userSchema
	});

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 5000);
	}
</script>

<section class="h-screen ml-10 mr-10">
	<div class="h-full">
		<!-- Left column container with background-->
		<div class="flex h-full flex-wrap items-center justify-center lg:justify-between">
			<div
				class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12"
			>
				<img
					src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
					class="w-full"
					alt="Sample image"
				/>
			</div>

			<!-- Right column container -->
			<div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
				<form method="POST" class="social">
					<!--Sign in section-->
					<div class="flex flex-row items-center justify-center lg:justify-start">
						<p class="mb-0 me-4 text-lg">Sign in with</p>

						<!-- Google -->
						<button
							formaction="?/social&provider=google"
							class="[&>svg]:mx-auto [&>svg]:h-9 [&>svg]:w-9 ml-3 hover:rotate-12"
						>
							<svg
								width="800px"
								height="800px"
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z"
									fill="#4285F4"
								/>
								<path
									d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z"
									fill="#34A853"
								/>
								<path
									d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z"
									fill="#FBBC05"
								/>
								<path
									d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z"
									fill="#EB4335"
								/>
							</svg>
						</button>

						<!-- Discord -->
						<button
							formaction="?/social&provider=discord"
							class="[&>svg]:mx-auto [&>svg]:h-9 [&>svg]:w-9 ml-3 hover:rotate-12"
						>
							<svg
								width="1024px"
								height="1024px"
								viewBox="0 0 1024 1024"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle cx="512" cy="512" r="512" style="fill:#5865f2" />
								<path
									d="M689.43 349a422.21 422.21 0 0 0-104.22-32.32 1.58 1.58 0 0 0-1.68.79 294.11 294.11 0 0 0-13 26.66 389.78 389.78 0 0 0-117.05 0 269.75 269.75 0 0 0-13.18-26.66 1.64 1.64 0 0 0-1.68-.79A421 421 0 0 0 334.44 349a1.49 1.49 0 0 0-.69.59c-66.37 99.17-84.55 195.9-75.63 291.41a1.76 1.76 0 0 0 .67 1.2 424.58 424.58 0 0 0 127.85 64.63 1.66 1.66 0 0 0 1.8-.59 303.45 303.45 0 0 0 26.15-42.54 1.62 1.62 0 0 0-.89-2.25 279.6 279.6 0 0 1-39.94-19 1.64 1.64 0 0 1-.16-2.72c2.68-2 5.37-4.1 7.93-6.22a1.58 1.58 0 0 1 1.65-.22c83.79 38.26 174.51 38.26 257.31 0a1.58 1.58 0 0 1 1.68.2c2.56 2.11 5.25 4.23 8 6.24a1.64 1.64 0 0 1-.14 2.72 262.37 262.37 0 0 1-40 19 1.63 1.63 0 0 0-.87 2.28 340.72 340.72 0 0 0 26.13 42.52 1.62 1.62 0 0 0 1.8.61 423.17 423.17 0 0 0 128-64.63 1.64 1.64 0 0 0 .67-1.18c10.68-110.44-17.88-206.38-75.7-291.42a1.3 1.3 0 0 0-.63-.63zM427.09 582.85c-25.23 0-46-23.16-46-51.6s20.38-51.6 46-51.6c25.83 0 46.42 23.36 46 51.6.02 28.44-20.37 51.6-46 51.6zm170.13 0c-25.23 0-46-23.16-46-51.6s20.38-51.6 46-51.6c25.83 0 46.42 23.36 46 51.6.01 28.44-20.17 51.6-46 51.6z"
									style="fill:#fff"
								/>
							</svg>
						</button>
					</div>
				</form>
				<form
					use:enhance
					action="?/login"
					method="post"
					class="mt-6"
					on:submit={() => {
						onSubmit();
					}}
				>
					<!-- Separator between social media sign in and email/password sign in -->
					<div
						class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500"
					>
						<p class="mx-4 mb-0 text-center font-semibold dark:text-white">Or</p>
					</div>
					{#if $message}
						<div
							class="text-red-500 border-red-500 border-2 bg-red-100 py-2 px-2 rounded-sm text-base mt-4 mb-6"
						>
							{$message}
						</div>
					{/if}

					<!-- Email input -->
					<div class="relative mb-6" data-twe-input-wrapper-init>
						{#if $errors.email}
							<small class="text-red-500">{$errors.email[0]}</small>
						{/if}
						<input
							required
							type="email"
							placeholder="name@domain.com"
							name="email"
							id="email"
							disabled={isLoading}
							bind:value={$form.email}
							class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
						/>
						<label
							for="email"
							class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
							>Email address
						</label>
					</div>

					<!-- Password input -->
					<div class="relative mb-6" data-twe-input-wrapper-init>
						{#if $errors.password}
							<small class="text-red-500">{$errors.password[0]}</small>
						{/if}
						<input
							required
							type="password"
							name="password"
							id="password"
							disabled={isLoading}
							bind:value={$form.password}
							class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
						/>
						<label
							for="password"
							class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
							>Password
						</label>
					</div>

					<div class="mb-6 flex items-center justify-between">
						<!-- Remember me checkbox -->
						<div class="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
							<input
								class="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
								type="checkbox"
								value=""
								id="exampleCheck2"
							/>
							<label class="inline-block ps-[0.15rem] hover:cursor-pointer" for="exampleCheck2">
								Remember me
							</label>
						</div>

						<!--Forgot password link-->
						<a href="#!">Forgot password?</a>
					</div>

					<!-- Login button -->
					<div class="text-center lg:text-left">
						<button
							type="submit"
							class="inline-block w-full rounded bg-primary px-7 pb-2 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
							data-twe-ripple-init
							data-twe-ripple-color="light"
						>
							{#if isLoading}
								<span class="loading loading-spinner loading-xs"></span>
							{/if}
							Login
						</button>
					</div>
				</form>
				<div class="text-center lg:text-left">
					<!-- Register link -->
					<p class="mb-0 mt-2 pt-1 text-sm font-semibold">
						Don't have an account?
						<a
							href="/signup"
							class="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
							>Register</a
						>
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	input:not(:placeholder-shown) + label {
		transform: translate(-1rem, -1.15rem) scale(0.8);
	}

	input:focus:not(:placeholder-shown) + label,
	input:valid + label {
		transform: translate(-1rem, -1.15rem) scale(0.8);
	}
</style>
