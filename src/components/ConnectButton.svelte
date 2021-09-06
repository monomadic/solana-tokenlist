<script lang="ts">
	import { pubKey } from '../stores/signer';
	import { connect, disconnect } from '../lib/wallet';
</script>

<main>
	<h1>Solana, Bro.</h1>
	{#if $pubKey}
		<p>PubKey: {$pubKey}</p>
		<button on:click={disconnect}>Disconnect</button>
	{:else}
		<button on:click={connect}>Connect</button>
	{/if}
</main>
