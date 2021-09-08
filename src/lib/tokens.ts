import { AccountLayout, TOKEN_PROGRAM_ID, u64 } from '@solana/spl-token';
import {
    clusterApiUrl,
    Connection,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js';
import { TokenListProvider } from '@solana/spl-token-registry';

const network = clusterApiUrl("mainnet-beta");
const connection = new Connection(network);

// export async function sayHello(programId: PublicKey, targetPubKey: PublicKey, connection: Connection, payer: Keypair): Promise<void> {
//     console.log('Saying hello to', targetPubKey.toBase58());

//     const instruction = new TransactionInstruction({
//         keys: [{ pubkey: targetPubKey, isSigner: false, isWritable: true }],
//         programId,
//         data: Buffer.alloc(0), // All instructions are hellos
//     });

//     await sendAndConfirmTransaction(
//         connection,
//         new Transaction().add(instruction),
//         [payer],
//     );
// }

export type TokenMap = Map<any, any>;

export async function getTokenMap(): Promise<TokenMap> {
    const tokenListProvider = await new TokenListProvider().resolve();

    return tokenListProvider
        .filterByClusterSlug('mainnet-beta')
        .getList()
        .reduce((map, item) => {
            map.set(item.address, item);
            return map;
        }, new Map());
}

// export async function getTokensWithMetadataForWallet(pubKey: string, mint: string): Promise<Array<?>> {
//     new TokenListProvider().resolve().then((tokens) => {
//         const tokenList = tokens.filterByClusterSlug('mainnet-beta').getList();

//         let sortedTokens = tokenList.reduce((map, item) => {
//             map.set(item.address, item);
//             return map;
//         }, new Map());

//         return sortedTokens.get(mint);
//     });
// }

export type TokenAccount = {
    address: PublicKey,
    mint: PublicKey,
    owner: PublicKey,
    amount: u64
}

// https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts
// Returns Token accounts associated with a wallet account.
export async function getTokenAccountsForWallet(pubKey: string): Promise<Array<TokenAccount>> {
    const resp = await connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
        commitment: connection.commitment,
        filters: [
            { dataSize: 165 }, // compares the program account data length with the provided data size
            {
                memcmp: { // filter memory comparison
                    offset: 32, // owner metadata is 32 bytes offset
                    bytes: pubKey,
                }
            },
        ]
    });

    return resp.map((_account, _index) => {
        const accountInfo = AccountLayout.decode(_account.account.data);
        accountInfo.mint = new PublicKey(accountInfo.mint);
        accountInfo.owner = new PublicKey(accountInfo.owner);
        accountInfo.amount = u64.fromBuffer(accountInfo.amount);

        return {
            address: _account.pubkey,
            mint: accountInfo.mint,
            owner: accountInfo.owner,
            amount: accountInfo.amount
        };
    });
}
