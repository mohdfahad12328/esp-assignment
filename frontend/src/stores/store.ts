import { writable } from 'svelte/store';

let date = new Date();
let seats: { id: number; isTaken: boolean, isLoggedIn: boolean }[] = [
    { id: 1, isTaken: false , isLoggedIn:false},
    { id: 2, isTaken: false , isLoggedIn:false},
    { id: 3, isTaken: false , isLoggedIn:false},
    { id: 4, isTaken: false , isLoggedIn:false},
    { id: 5, isTaken: false , isLoggedIn:false},
    { id: 6, isTaken: false , isLoggedIn:false},
    { id: 7, isTaken: false , isLoggedIn:false},
    { id: 8, isTaken: false , isLoggedIn:false},
    { id: 9, isTaken: false , isLoggedIn:false},
    { id: 10, isTaken: false, isLoggedIn:false },
    { id: 11, isTaken: false, isLoggedIn:false },
    { id: 12, isTaken: false, isLoggedIn:false },
    { id: 13, isTaken: false, isLoggedIn:false },
    { id: 14, isTaken: false, isLoggedIn:false },
    { id: 15, isTaken: false, isLoggedIn:false },
];

export const slotSelectedStore = writable("");
export const seatSelectedStore = writable("");
export const dateSelectedStore = writable(date.toDateString());
export const slotDataStore = writable(seats);
export const userNameStore = writable("");
export const rollNumStore = writable("");