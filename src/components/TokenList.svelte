<script lang="ts">
	import NFTItem from './NFTItem.svelte';
	import TokenItem from './TokenItem.svelte';

	import { pubKey } from '../stores/signer';
	import { getTokenAccountsForWallet, getTokenMap, sortByTokenType } from '$lib/tokens';

	$: tokenMap = getTokenMap();
	$: accounts = getTokenAccountsForWallet($pubKey).then(sortByTokenType);
</script>

<main>
	<div
		class="box-border px-3 py-1 max-w-screen-sm bg-opacity-5 bg-white rounded-box text-base-content"
	>
		{#await accounts}
			<div class="p-4">Loading tokens...</div>
		{:then accounts}
			<ul>
				{#each accounts.nfts as account}
					<li class="my-4">
						<NFTItem {account} />
					</li>
				{/each}
			</ul>
			<ul>
				{#each accounts.tokens as account}
					<li class="my-4">
						<TokenItem {account} bind:tokenMap />
					</li>
				{/each}
			</ul>
		{:catch err}
			<div class="p-4 bg-error">Error: {err.message}</div>
		{/await}
	</div>
</main>
