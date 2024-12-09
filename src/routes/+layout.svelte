<script lang="ts">
  import { currentUser, members, modalVisible } from '$lib/store.js';
  import Nav from '$components/Nav.svelte';
  import Modal from '$components/Modal.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  export let data;

  if ($currentUser == null) {
    currentUser.set(data.users[0]);
    members.set([data.users[0], data.users[1]]);
  }

  $: if ($currentUser.teacher) {
    if ($page.url.pathname == '/grades') {
      goto('/grading');
    }
  } else {
    if ($page.url.pathname === '/') {
      goto('/assignments');
    } else if ($page.url.pathname == '/grading') {
      goto('/grades');
    }
  }
</script>

{#if $modalVisible}
  <Modal />
{:else}
  <Nav users={data.users} />
  <slot />
{/if}
