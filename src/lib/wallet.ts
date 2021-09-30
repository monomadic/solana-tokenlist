import { pubKey } from '../stores/signer';

// a lot of assumptions are made in this file. needs a fixup.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

export async function connect(): Promise<void> {
	const provider = getPhantom();

	window.solana.on('connect', onConnect);
	window.solana.on('disconnect', onDisconnect);

	provider.connect();
}

export async function disconnect(): Promise<void> {
	const provider = getPhantom();
	provider.disconnect();
}

// fix typing.
function getPhantom() {
	if ('solana' in window) {
		const provider = window.solana;
		return provider;
	}
	// no provider, handle it
}

function onConnect() {
	pubKey.set(window.solana.publicKey.toString());
}

function onDisconnect() {
	pubKey.set(undefined);
}

// function isConnected(): boolean {
// 	return window.solana.isConnected();
// }

// async function getBalance(pubKey: string) {
// 	window.solana.getBalance();
// }
