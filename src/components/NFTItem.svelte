<script lang="ts">
	import { onMount } from 'svelte';
	import { formatPrice, fromLamports } from '$lib/number';
	import type { TokenAccount, TokenMap } from '$lib/tokens';
	import { getNFTMetadata } from '$lib/metaplex';
	import { fetchNFT, fetchNFTMetadata } from '$lib/nft';

	export let account: TokenAccount;

	$: nftInfo = fetchNFTMetadata(account.mint);
</script>

{#await nftInfo}
	<!-- nftInfo is pending -->
{:then info}
<div class="flex p-2 space-x-3 hover:bg-purple-900 cursor-pointer">
	<div class="">
		<img class="rounded h-36 w-36" src={info.image} alt="" height="150px" />
	</div>

	<div class="flex justify-between w-full">
		<div>
			<div class="text-xl font-bold">{info.name || "Untitled"}</div>
			<div class="text-sm text-gray-400">{info.description}</div>
		</div>
	</div>
</div>
{:catch error}
	<!-- nftInfo was rejected -->
{/await}


