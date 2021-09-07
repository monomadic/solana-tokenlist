<script lang="ts">
	import { pubKey } from '../stores/signer';
	import { getBalance } from '../lib/provider';

	$: balance = $pubKey && getBalance($pubKey);
</script>

<main>
	<p>
		SOL Balance:
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
	</p>
</main>
