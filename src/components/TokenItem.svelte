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
	<div class="flex p-2 space-x-3 hover:bg-purple-900 rounded cursor-pointer">
		<div class="">
			<img class="rounded-full h-12 w-12" src={tokenInfo.logoURI} alt="" height="50px" />
		</div>

		<div class="flex justify-between w-full">
			<div>
				<div class="font-bold">{tokenInfo.symbol}</div>
				<div class="text-xs text-gray-400">{tokenInfo.name}</div>
			</div>

			<div class="text-gray-400">
				{formatPrice(fromLamports(account.amount, tokenInfo.decimals))}
				{tokenInfo.symbol}
			</div>
		</div>
	</div>
{/if}
