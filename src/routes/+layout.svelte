<script lang="ts">
  import { modalVisible } from '$lib/store.js';
  import Nav from '$components/Nav.svelte';
  import Modal from '$components/Modal.svelte';
</script>

{#if $modalVisible}
  <Modal />
{:else}
  <Nav />
  <slot />
{/if}
