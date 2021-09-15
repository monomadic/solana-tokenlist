<script lang="ts">
	import TokenItem from './TokenItem.svelte';
	import NFTItem from './NFTItem.svelte';

	import { pubKey } from '../stores/signer';
	import { getTokenAccountsForWallet, getTokenMap } from '$lib/tokens';

	$: tokenMap = getTokenMap();
	$: accounts = $pubKey && getTokenAccountsForWallet($pubKey);
</script>

<main>
	<div
		class="box-border px-3 py-1 max-w-screen-sm bg-opacity-5 bg-white rounded-box text-base-content"
	>
		{#await accounts}
			<div class="p-4">Loading NFT...</div>
		{:then _accounts}
			<ul>
				{#each _accounts as account}
					<li class="my-4">
						<NFTItem {account} bind:tokenMap />
					</li>
				{/each}
			</ul>
		{:catch err}
			{err.message}
		{/await}
	</div>
</main>
