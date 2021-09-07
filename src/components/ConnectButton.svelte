<script lang="ts">
	import { pubKey } from '../stores/signer';
	import { connect, disconnect } from '../lib/wallet';
</script>

<main>
	{#if $pubKey}
		<div class="btn" on:click={disconnect}>Disconnect</div>
	{:else}
		<div class="btn" on:click={connect}>Connect</div>
	{/if}
</main>
