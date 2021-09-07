<script lang="ts">
	import { onMount } from 'svelte';
	import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry';
	import type { TokenAccount } from '$lib/tokens';
	import { formatPrice, fromLamports } from '$lib/number';

	export let account: TokenAccount;

	$: tokenInfo = undefined;

	onMount(() => {
		new TokenListProvider().resolve().then((tokens) => {
			const tokenList = tokens.filterByClusterSlug('mainnet-beta').getList();

			let sortedTokens = tokenList.reduce((map, item) => {
				map.set(item.address, item);
				return map;
			}, new Map());

			tokenInfo = sortedTokens.get(account.mint.toBase58());
			console.log('tokenInfo', tokenInfo);
		});
	});
</script>

{#if tokenInfo}
	<img src={tokenInfo.logoURI} alt="" height="50px" />
	<strong>{tokenInfo.symbol}</strong>
	{tokenInfo.name}
	{formatPrice(fromLamports(account.amount, tokenInfo.decimals))}
{/if}
