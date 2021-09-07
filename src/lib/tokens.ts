import {
    Keypair,
    Connection,
    PublicKey,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
    clusterApiUrl,
} from '@solana/web3.js';

import {
    AccountLayout,
    TOKEN_PROGRAM_ID,
    u64,
} from "@solana/spl-token";

import type { AccountInfo } from "@solana/spl-token";

import { compute_rest_props } from 'svelte/internal';

const network = clusterApiUrl("mainnet-beta");
const connection = new Connection(network);
const providerUrl = 'https://www.sollet.io';

export async function sayHello(programId: PublicKey, targetPubKey: PublicKey, connection: Connection, payer: Keypair): Promise<void> {
    console.log('Saying hello to', targetPubKey.toBase58());

    const instruction = new TransactionInstruction({
        keys: [{ pubkey: targetPubKey, isSigner: false, isWritable: true }],
        programId,
        data: Buffer.alloc(0), // All instructions are hellos
    });

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [payer],
    );
}

// export async function getSPLBalance(programId: PublicKey, connection: Connection) {
//     let resp = await connection.getProgramAccounts(programId, {
//         commitment: connection.commitment,
//         filters,
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
        const accountInfo: AccountInfo = AccountLayout.decode(_account.account.data);

        console.log(accountInfo);
        return {
            address: _account.pubkey,
            mint: new PublicKey(accountInfo.mint),
            owner: new PublicKey(accountInfo.owner),
            amount: new u64(accountInfo.amount) // u64
        };
    });
}
