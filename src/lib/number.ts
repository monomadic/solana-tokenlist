import type { u64 } from '@solana/spl-token';

export function fromLamports(amount: number, decimals: number): number {
	return amount / 10 ** decimals;
}

export function formatPrice(amount: number): string {
	return amount.toFixed(2);
}
