import type { u64 } from '@solana/spl-token';
import BN from 'bn.js';

export function formatPrice(amount: u64, decimals: number): string {
    let divider = new BN(10).pow(new BN(decimals));
    // return amount.div(new BN(1)).toString();

    return amount.toString()

    // return (amount.toNumber() / 10e8);
}
