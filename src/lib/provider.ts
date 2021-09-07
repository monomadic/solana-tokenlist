import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const network = clusterApiUrl("mainnet-beta");
const connection = new Connection(network);
const providerUrl = 'https://www.sollet.io';

export async function getBalance(pubKey: string): Promise<number> {
    let pk = new PublicKey(pubKey);
    return connection.getBalance(pk);
}
