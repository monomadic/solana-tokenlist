<script lang="ts">
	import { onMount } from 'svelte';
	import { formatPrice, fromLamports } from '$lib/number';
	import type { TokenAccount, TokenMap } from '$lib/tokens';

	export let account: TokenAccount;
	export let tokenMap: Promise<TokenMap>;

	$: tokenInfo = undefined;

	onMount(() => {
		console.log(account);
		tokenMap.then((tokens) => {
			tokenInfo = tokens.get(account.mint.toBase58());
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
{:else}
	Unknown Token: {account.mint.toBase58()}
{/if}
