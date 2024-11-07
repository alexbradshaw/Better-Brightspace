// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  interface message {
    userid: number;
    body: string;
    id: number;
  }

  interface resource {
    resource: string;
    type: string;
    size: string;
    id: number;
  }
}

export {};
