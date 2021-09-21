<script lang="ts">
	import NFTItem from './NFTItem.svelte';

	import { pubKey } from '../stores/signer';
	import { getTokenAccountsForWallet } from '$lib/tokens';

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
						<NFTItem {account} />
					</li>
				{/each}
			</ul>
		{:catch err}
			{err.message}
		{/await}
	</div>
</main>
