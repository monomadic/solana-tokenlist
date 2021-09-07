<script lang="ts">
	import TokenList from '../components/TokenList.svelte';
	import ConnectButton from '../components/ConnectButton.svelte';
	import SolBalance from '../components/SolBalance.svelte';
	import { pubKey } from '../stores/signer';
</script>

<svelte:head>
	<script>
		global = globalThis; // for solana web3 repo
	</script>
</svelte:head>

<main>
	<h1>Solana, Bro.</h1>
	<ConnectButton />

	{#if $pubKey}
		<p>PubKey: {$pubKey}</p>
		<SolBalance />
		<TokenList />
	{/if}
</main>
