import { pubKey } from '../stores/signer';

// a lot of assumptions are made in this file. needs a fixup.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

export function connect(): void {
	const provider = window && window.solana;

	// check for phantom
	if (provider) {
		provider.on('connect', onConnect);
		provider.on('disconnect', onDisconnect);
		provider.connect();
	}
}

export function disconnect(): void {
	const provider = window && window.solana;
	provider.disconnect();
}

function onConnect() {
	const provider = window && window.solana;
	pubKey.set(provider.publicKey.toString());
}

function onDisconnect() {
	pubKey.set(undefined);
}
