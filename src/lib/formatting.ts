/// format a public key in reduced format eg 0x556..556
export function shortAddress(address: string): string {
	return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
}
