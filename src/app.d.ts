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

  interface person {
    firstname: string;
    lastname: string;
    teacher: boolean;
    id: number;
  }

  interface message {
    userid: number;
    body: string;
    members: number[];
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
