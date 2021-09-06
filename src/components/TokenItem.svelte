<script lang="ts">
	export let tokenMint: string;

	import { onMount } from 'svelte';
	import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';

	$: tokenInfo = undefined;

	onMount(() => {
		let tokenMap: Map<string, TokenInfo> = new Map();

		new TokenListProvider().resolve().then((tokens) => {
			const tokenList = tokens.filterByClusterSlug('mainnet-beta').getList();
			// console.log(tokens.getList());

			let sortedTokens = tokenList.reduce((map, item) => {
				map.set(item.address, item);
				return map;
			}, new Map());

			tokenInfo = sortedTokens.get(tokenMint);

			console.log(tokenInfo);
		});
	});
</script>

{#if tokenInfo}
	<img src={tokenInfo.logoURI} alt="" height="50px" />
	<strong>{tokenInfo.symbol}</strong>
	{tokenInfo.name}
{/if}
