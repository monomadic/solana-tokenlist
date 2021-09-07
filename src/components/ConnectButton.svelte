<script lang="ts">
	import { pubKey } from '../stores/signer';
	import { connect, disconnect } from '../lib/wallet';
</script>

<main>
	{#if $pubKey}
		<button on:click={disconnect}>Disconnect</button>
	{:else}
		<button on:click={connect}>Connect</button>
	{/if}
</main>
