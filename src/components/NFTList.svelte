<script lang="ts">
	import NFTItem from './NFTItem.svelte';
	import TokenItem from './TokenItem.svelte';

	import { pubKey } from '../stores/signer';
	import { getTokenAccountsForWallet, getTokenMap, SPLTokenType } from '$lib/tokens';

	$: tokenMap = getTokenMap();
	$: accounts = getTokenAccountsForWallet($pubKey);
</script>

<main>
	<div
		class="box-border px-3 py-1 max-w-screen-sm bg-opacity-5 bg-white rounded-box text-base-content"
	>
		{#await accounts}
			<div class="p-4">Loading tokens...</div>
		{:then _accounts}
			<ul>
				{#each _accounts as account}
					<li class="my-4">
						{#if account.type == SPLTokenType.NonFungibleToken }
							<NFTItem {account} />
						{:else}
							<TokenItem {account} bind:tokenMap />
						{/if}
					</li>
				{/each}
			</ul>
		{:catch err}
			<div class="p-4 bg-error">Error: {err.message}</div>
		{/await}
	</div>
</main>
