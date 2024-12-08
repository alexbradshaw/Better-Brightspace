<script lang="ts">
  import { currentUser, members, modalVisible } from '$lib/store.js';
  import Nav from '$components/Nav.svelte';
  import Modal from '$components/Modal.svelte';

  export let data;

  if ($currentUser == null) {
    currentUser.set(data.users[0]);
    members.set([data.users[0], data.users[1]]);
  }
</script>

{#if $modalVisible}
  <Modal />
{:else}
  <Nav users={data.users} />
  <slot />
{/if}
