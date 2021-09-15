import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { deserializeUnchecked } from 'borsh';

import { Metadata, METADATA_SCHEMA } from './metaplex/schema';

export const metadataProgram = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

const network = clusterApiUrl('devnet');
const connection = new Connection(network);

// eslint-disable-next-line no-control-regex
const METADATA_REPLACE = new RegExp('\u0000', 'g');

export async function fetchNFTMetadata(mintPubKey: PublicKey) {
	return fetchNFT(mintPubKey).then(async (data) => {
		const metadataURL = data[0].data.uri; // check this - multiple?
		const remoteData = await fetch(metadataURL).then((resp) => resp.json());
		return remoteData;
	});
}

export async function fetchNFT(mintPubKey: PublicKey): Promise<Array<Metadata>> {
	return connection
		.getProgramAccounts(metadataProgram, {
			filters: [
				{
					memcmp: {
						offset:
							1 + // key
							32, // update auth
						bytes: mintPubKey.toBase58()
					}
				}
			]
		})
		.then((accounts) => {
			return accounts.map((account) => {
				return decodeMetadata(account.account.data);
			});
		});
}

export const decodeMetadata = (buffer: Buffer): Metadata => {
	const metadata = deserializeUnchecked(METADATA_SCHEMA, Metadata, buffer) as Metadata;
	metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, '');
	metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, '');
	metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, '');
	return metadata;
};
