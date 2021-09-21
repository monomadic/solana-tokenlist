<script lang="ts">
	import type { TokenAccount } from '$lib/tokens';
	import { fetchNFTMetadata } from '$lib/nft';

	export let account: TokenAccount;

	$: nftInfo = fetchNFTMetadata(account.mint);

	function loadCart(url: string) {
		PicoPlayer('pico-container', url);
	}
</script>

<div id="pico-container" />

{#await nftInfo}
	<div class="flex p-2 space-x-3 hover:bg-purple-900 cursor-pointer">
		<div class="">
			<div class="rounded h-36 w-36 bg-black bg-opacity-20" />
		</div>
	</div>
{:then info}
	<div
		on:click={() => {
			loadCart(info.image);
		}}
		class="flex p-2 space-x-3 hover:bg-purple-900 cursor-pointer"
	>
		<div class="">
			<img
				class="rounded h-36 w-36 bg-black bg-opacity-20"
				src={info.image}
				alt=""
				height="150px"
			/>
		</div>

		<div class="flex justify-between w-full">
			<div>
				<div class="text-xl font-bold">{info.name || 'Untitled'}</div>
				<div class="text-sm text-gray-400">{info.description}</div>
			</div>
		</div>
	</div>
{:catch error}
	{error}
{/await}

<style>
	:global(#pico-container canvas) {
		width: 100% !important;
	}
</style>
