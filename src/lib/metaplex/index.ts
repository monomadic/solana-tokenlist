import {
    clusterApiUrl, Connection, PublicKey,
} from '@solana/web3.js';
import { TokenListProvider } from '@solana/spl-token-registry';

import type { AccountInfo } from '@solana/web3.js';
import { Metadata, METADATA_SCHEMA } from './schema';

import { deserializeUnchecked, deserialize } from 'borsh';
import { extendBorsh } from './borsh';
import type { StringPublicKey } from './borsh';
import { MetadataKey } from './types';
extendBorsh();

const network = clusterApiUrl("devnet");
const connection = new Connection(network);

export const METADATA_PROGRAM_ID =
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s' as StringPublicKey;

export const VAULT_ID =
    'vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn' as StringPublicKey;

export const AUCTION_ID =
    'auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8' as StringPublicKey;

export const METAPLEX_ID =
    'p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98' as StringPublicKey;

// this might be a dumb test, I mean, unless solana loses referential integrity somehow
const isMetaplexAccount = (account: AccountInfo<Buffer>) =>
    (account.owner as unknown as any) === METAPLEX_ID;

export const MAX_NAME_LENGTH = 32;

export const MAX_SYMBOL_LENGTH = 10;

export const MAX_URI_LENGTH = 200;

export const MAX_CREATOR_LIMIT = 5;

export const MAX_CREATOR_LEN = 32 + 1 + 1;
export const MAX_METADATA_LEN =
    1 +
    32 +
    32 +
    MAX_NAME_LENGTH +
    MAX_SYMBOL_LENGTH +
    MAX_URI_LENGTH +
    MAX_CREATOR_LIMIT * MAX_CREATOR_LEN +
    2 +
    1 +
    1 +
    198;

export async function getNFTsForAccount(pubKey: string) {
    console.log("ffff");

    await connection.getProgramAccounts(new PublicKey(METADATA_PROGRAM_ID), {
        // commitment: connection.commitment,
        // filters: [
        //     {
        //         memcmp: { // filter memory comparison
        //             offset: 32, // owner metadata is 32 bytes offset
        //             bytes: '6eNvdpQdJkZa1At6Upco94gHBCcPRKPhz1yNzJdLLiku',
        //         }
        //     },
        // ]
        // filters: [
        //     {
        //         memcmp: {
        //             offset: 64,
        //             bytes: "6eNvdpQdJkZa1At6Upco94gHBCcPRKPhz1yNzJdLLiku",
        //         },
        //     },
        // ]
    }).then(
        accounts => {
            console.log(accounts);
            console.log("accounts", accounts[0]);
            // accounts.forEach(({ account, pubkey }) => {
            //     if (!isMetaplexAccount(account)) return;

            //     const STORE_ID = programIds().store;
            // });
            // const metadata = deserializeUnchecked(
            //     METADATA_SCHEMA,
            //     Metadata,
            //     accounts[0].account.data,
            // ) as Metadata;

            // const key = accounts[0].account.data.slice(0, 1);
            // console.log(key);

            // const storeKey = new PublicKey(accounts[0].account.data.slice(1, 33));
            // console.log(storeKey);

            const metadata = deserializeUnchecked(METADATA_SCHEMA, Metadata, accounts[0].account.data);
            console.log(metadata);
        }
    )
}

// class Metadata {
//     key: MetadataKey;
//     updateAuthority: string;
//     mint: string;

//     constructor(args: { key: Uint8Array, updateAuthority: any, mint: any }) {
//         console.log(args);
//         this.key = new Number(args.key).valueOf() as MetadataKey; //new Number(args.key).valueOf();
//         this.updateAuthority = args.updateAuthority;
//         this.mint = args.mint;
//     }
// };
// export const METADATA_SCHEMA = new Map<any, any>([
//     [
//         Metadata,
//         {
//             kind: 'struct',
//             fields: [
//                 ['key', 'u8'],
//                 ['updateAuthority', 'pubkeyAsString'],
//                 ['mint', 'pubkeyAsString'],
//                 // ['data', Data],
//                 // ['primarySaleHappened', 'u8'], // bool
//                 // ['isMutable', 'u8'], // bool
//             ],
//         },
//     ],
// ]);

// export const decodeMetadata = (buffer: Buffer): Metadata => {
//     const metadata = deserializeUnchecked(
//         METADATA_SCHEMA,
//         Metadata,
//         buffer,
//     ) as Metadata;
//     metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, '');
//     metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, '');
//     metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, '');
//     return metadata;
// };

// export const processMetaplexAccounts: ProcessAccountsFunc = async (
//     { account, pubkey },
//     setter,
//     useAll,
// ) => {
// }