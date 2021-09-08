import type { u64 } from '@solana/spl-token';

export function fromLamports(amount: u64, decimals: number): number {
    return (amount.toNumber() / 10 ** decimals)
}

export function formatPrice(amount: number): string {
    return amount.toFixed(2);
}
