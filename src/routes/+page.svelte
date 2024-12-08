<script lang="ts">
  import Row from '$components/Row.svelte';
  import { currentUser, modalVisible, resources } from '$lib/store.js';
  import { onMount } from 'svelte';
  import type { ActionData } from './$types.js';
  import { goto } from '$app/navigation';

  currentUser.subscribe((user) => {
    if (!user.teacher) {
      goto('/assignments');
    }
  });

  export let data;
  export let form: ActionData;

  $: if (form?.newResource) {
    resources.update((value) => [...value, form.newResource]);
  }

  onMount(() => {
    resources.set(data.resources);
  });
</script>

<main>
  <section>
    <div id="quizBody">
      <div><h3>Quiz 1 Resources</h3></div>
      <div id="resourceGrid">
        <div id="header">
          <div>Resource</div>
          <div>Resource Type</div>
          <div>Size</div>
          <div>Remove</div>
        </div>
        {#each $resources as resource, index}
          <Row
            resource={resource.resource}
            type={resource.type}
            size={resource.size}
            id={index}
          />
        {/each}
      </div>
      <div>
        <button id="add" on:click={() => modalVisible.set(true)}
          >Add an allowed resource for Quiz 1 +</button
        >
      </div>
    </div>
  </section>
</main>

<style>
  section {
    width: 100%;
    height: 550px;
    display: grid;
    justify-content: center;
    align-items: center;
  }

  #quizBody {
    display: grid;
    grid-template-rows: 55px 1fr 40px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 600px;
    height: 500px;
    border: 3px solid black;
    border-radius: 20px;
  }

  #quizBody > div {
    display: grid;
    justify-content: center;
    width: 600px;
    height: 100%;
    border: 1px solid black;
  }

  #resourceGrid {
    height: 100%;
    display: grid;
    justify-content: center;
    align-content: flex-start;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  #header > div {
    display: grid;
    justify-content: center;
    align-items: center;
    border: solid black;
    border-width: 1px 0px 1px 1px;
  }

  #header > div:first-child {
    border-width: 1px 0px;
  }

  #header {
    width: 600px;
    height: 100%;
    display: grid;
    grid-template-columns: 3fr 2fr 1fr 0.9fr;
    grid-template-rows: 50px;
    justify-content: center;
  }

  #add {
    width: 650px;
    height: 41px;
  }
</style>
