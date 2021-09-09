<script lang="ts">
	import { getNFTsForAccount } from '$lib/metaplex';
	import { pubKey } from '../stores/signer';
	import { onMount } from 'svelte';

	onMount(() => {
		getNFTsForAccount($pubKey);
	});
</script>
