<script lang="ts">
	import TokenList from '../components/TokenList.svelte';
	import NFTList from '../components/NFTList.svelte';
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
	<div class="flex justify-center">
		<div class="flex justify-center my-4" style="min-width: 440px;">
			<ConnectButton />
		</div>
	</div>

	{#if $pubKey}
		<div class="flex justify-center">
			<div style="min-width: 440px;">
				<SolBalance />
				<TokenList />
				<NFTList />
			</div>
		</div>
	{/if}
</main>

<style type="text/css">
	:root {
		background-color: rgb(22, 0, 41);
	}
</style>
