import { writable } from 'svelte/store';

export const modalVisible = writable(false);
export const messages = writable<message[]>([]);
export const resources = writable<resource[]>([]);
export const members = writable<person[]>([]);
export const currentUser = writable<person>();
export const currentUserId = writable<number>(0);
export const derivedVal = writable<string>('');
export const acceptOrDeny = writable<boolean>(false);
export const resourcesOpen = writable<boolean>(false);
