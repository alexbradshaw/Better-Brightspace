import { writable } from 'svelte/store';

export const modalVisible = writable(false);
export const messages = writable<message[]>([]);
export const resources = writable<resource[]>([]);
