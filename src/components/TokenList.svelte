<script lang="ts">
	import TokenItem from './TokenItem.svelte';
	import { pubKey } from '../stores/signer';
	import { getTokenAccountsForWallet } from '../lib/tokens';

	$: accounts = $pubKey && getTokenAccountsForWallet($pubKey);
</script>

{#await accounts}
	<p>Loading tokens...</p>
{:then _accounts}
	<ul>
		{#each _accounts as account}
			<li>
				<TokenItem {account} />
			</li>
		{/each}
	</ul>
{:catch err}
	{err.message}
{/await}
