<script lang="ts">
	import { pubKey, pubKey } from '../stores/signer';
	import { connect, disconnect } from '../lib/wallet';

	$: shortAddress = $pubKey
		? `${$pubKey.substring(0, 5)}...${$pubKey.substring($pubKey.length - 4)}`
		: null;
</script>

<main>
	{#if $pubKey}
		<div class="btn btn-primary" on:click={disconnect}>{shortAddress}</div>
	{:else}
		<div class="btn btn-primary" on:click={connect}>Connect</div>
	{/if}
</main>
