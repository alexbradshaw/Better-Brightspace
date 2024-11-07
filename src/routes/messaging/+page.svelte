<script lang="ts">
  import type { ActionData } from './$types';
  import { messages } from '$lib/store.js';
  import { onMount, afterUpdate } from 'svelte';
  import { enhance } from '$app/forms';

  export let form: ActionData;
  export let data;

  let container: HTMLElement;

  $: if (form?.newMessage) {
    messages.update((value) => [...value, form.newMessage]);
  }

  onMount(() => {
    messages.set(data.message);
    container.scrollTop = container.scrollHeight;
  });

  afterUpdate(() => {
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
</script>

<section>
  <div id="messageBody">
    <div id="header"><h3>Messages</h3></div>
    <div id="messages" bind:this={container}>
      {#each $messages as message}
        <div
          class={message.userid == 0 ? 'left' : 'right'}
          id={message.id.toString()}
        >
          <div>
            {message.body}
          </div>
        </div>
      {/each}
      <div>a</div>
      <div>a</div>
    </div>
    <form method="POST" id="text" use:enhance>
      <textarea name="message" placeholder="Super awesome message!"></textarea>
      <input type="submit" value="Send" />
    </form>
  </div>
</section>

<style>
  section {
    width: 100%;
    height: 550px;
    display: grid;
    justify-content: center;
    align-items: center;
  }

  #messageBody {
    display: grid;
    grid-template-rows: 55px 1fr 100px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 600px;
    height: 500px;
    border: 3px solid black;
    border-radius: 20px;
  }

  #messageBody > * {
    display: grid;
    justify-content: center;
    width: 600px;
    height: 100%;
    border: 1px solid black;
  }

  #header {
    background-color: white;
    z-index: 2;
  }

  #messages {
    display: grid;
    row-gap: 15px;
    overflow-y: scroll;
    overflow-x: hidden;
    align-content: flex-start;
    width: 600px;
    border: none !important;
    padding-top: 100px;
    margin-bottom: 50px;
    scrollbar-width: none;
    z-index: 0;
  }

  #messages > div {
    width: 600px;
    display: grid;
    align-items: center;
  }

  .left {
    justify-content: flex-start;
    padding-left: 60px;
  }

  .right {
    justify-content: flex-end;
    padding-right: 60px;
  }

  .left > div,
  .right > div {
    width: 250px;
    min-height: 40px;
    padding: 15px;
    border: 1px solid black;
    border-radius: 20px;
  }

  #text {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    background-color: white;
    z-index: 1;
  }

  textarea {
    width: 400px;
    height: 80px;
  }

  input {
    position: relative;
    left: 32px;
    width: 70px;
    height: 50px;
  }
</style>
