<script lang="ts">
	import { pubKey } from '../stores/signer';
	import { getBalance } from '../lib/provider';

	$: balance = $pubKey && getBalance($pubKey);
</script>

<main>
	<div class="flex space-x-1 my-3 justify-end max-w-screen-sm">
		<img
			src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
			class="rounded-full h-6"
		/>
		<div>
			SOL
			{#await balance}
				...
			{:then _balance}
				{(_balance / 1e9).toLocaleString('en', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				})}
			{:catch err}
				{err.message}
			{/await}
		</div>
	</div>
</main>
