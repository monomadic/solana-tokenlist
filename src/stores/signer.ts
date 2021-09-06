import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const provider: Writable<any> = writable(undefined);
export const pubKey: Writable<string> = writable(undefined);