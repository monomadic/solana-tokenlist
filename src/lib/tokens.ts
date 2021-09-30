import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { TokenListProvider } from '@solana/spl-token-registry';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';

import { extendBorsh } from './metaplex/borsh';

extendBorsh();

const network = clusterApiUrl('devnet');
const connection = new Connection(network);

export type SPLToken = {
	pubkey: web3.PublicKey;
	account: web3.AccountInfo<web3.ParsedAccountData | Buffer>;
};

export enum SPLTokenType {
	FungibleToken = 0,
	NonFungibleToken = 1
}

export type TokenInfo = {
	address: PublicKey;
	mint: PublicKey;
	owner: PublicKey;
	amount: number;
	type: SPLTokenType;
};

/**
 * Returns SPL Token accounts associated with a wallet account.
 * Metaplex NFTs are SPL Tokens, so we must request to fetch them first, and filter later. */
async function fetchSPLTokens(connection: Connection, pubKey: PublicKey): Promise<SPLToken[]> {
	return connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
		commitment: connection.commitment,
		filters: [
			{ dataSize: 165 }, // compares the program account data length with the provided data size
			{
				memcmp: {
					// filter memory comparison
					offset: 32, // owner metadata is 32 bytes offset
					bytes: pubKey.toBase58()
				}
			}
		]
	});
}

async function fetchAccountData(
	mintAddress: PublicKey
): Promise<{ mint: PublicKey; decimals: number; supply: number }> {
	return connection.getParsedAccountInfo(mintAddress).then((account) => {
		const data = account.value?.data as web3.ParsedAccountData;
		return {
			mint: mintAddress,
			decimals: data.parsed.info.decimals,
			supply: data.parsed.info.supply
		};
	});
}

/** Filter only NFT Token accounts */
function tokenType(account: { decimals: number; supply: number }): SPLTokenType {
	// should have a mint with a supply of 1, decimals 0.
	if (account.decimals == 0 && account.supply == 1) {
		return SPLTokenType.NonFungibleToken;
	} else {
		return SPLTokenType.FungibleToken;
	}
}

async function mapTokenType(token: SPLToken): Promise<TokenInfo> {
	const data = token.account.data as web3.ParsedAccountData;
	const mintAddress = new PublicKey(data.parsed.info.mint);

	// fetch account data for mint
	return await fetchAccountData(mintAddress).then((account) => {
		console.log('account', data.parsed);
		return {
			address: new web3.PublicKey(token.pubkey),
			mint: new web3.PublicKey(account.mint),
			owner: new web3.PublicKey(token.account.owner),
			amount: data.parsed.info.tokenAmount.uiAmount,
			type: tokenType(account)
		};
	});
}

// async function reduceTokenType(token: SPLToken, accum: {}): {} {
//     return {};
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

// https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts
// Returns Token accounts associated with a wallet account.
export async function getTokenAccountsForWallet(pubKey: string): Promise<TokenInfo[]> {
	return await fetchSPLTokens(connection, new web3.PublicKey(pubKey)).then(async (tokens) => {
		const mappy = await Promise.all(tokens.map(mapTokenType));
		console.log('mappy', mappy);
		return mappy;
	});
	// const resp = await connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
	// 	commitment: connection.commitment,
	// 	filters: [
	// 		{ dataSize: 165 }, // compares the program account data length with the provided data size
	// 		{
	// 			memcmp: {
	// 				// filter memory comparison
	// 				offset: 32, // owner metadata is 32 bytes offset
	// 				bytes: pubKey
	// 			}
	// 		}
	// 	]
	// });

	// // console.log("rest", resp[0].account.data);

	// return resp.map((_account, _index) => {
	// 	const accountInfo = AccountLayout.decode(_account.account.data);
	// 	accountInfo.mint = new PublicKey(accountInfo.mint);
	// 	accountInfo.owner = new PublicKey(accountInfo.owner);
	// 	accountInfo.amount = u64.fromBuffer(accountInfo.amount);

	// 	console.log('accountInfo', accountInfo);

	// 	return {
	// 		address: _account.pubkey,
	// 		mint: accountInfo.mint,
	// 		owner: accountInfo.owner,
	// 		amount: accountInfo.amount
	// 	};
	// });
}
