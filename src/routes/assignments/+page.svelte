<script lang="ts">
  import { resources, resourcesOpen } from '$lib/store.js';
  import { onMount } from 'svelte';
  import type { ActionData } from './$types.js';

  export let data;
  export let form: ActionData;

  $: if (form?.newResource) {
    resources.update((value) => [...value, form.newResource]);
  }

  onMount(() => {
    resources.set(data.resources);
  });

  const resourceSwitch = (state: boolean) => {
    if ($resourcesOpen != state) {
      resourcesOpen.set(state);
    }
  };
</script>

<main>
  <section>
    <div id="quizBody">
      <div><h3>Quizzes</h3></div>
      <div id="resourceGrid">
        <div id="header">
          <div>
            <button on:click={() => resourceSwitch(false)}>Active Quiz</button>
          </div>
          <div>
            <button on:click={() => resourceSwitch(true)}>Resources</button>
          </div>
        </div>
        {#if $resourcesOpen}
          <div class="resources">
            {#each $resources as resource}
              <div>
                <div>{resource.resource}</div>
                <div class="resourceButton">
                  <button>Access Resource</button>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="quiz">
            <div class="question">
              <div>
                <h4>What is your favorite color from this list of choices?</h4>
              </div>
              <div class="choices">
                <h6>A. Red</h6>
                <h6>B. Green</h6>
                <h6>C. Blue</h6>
                <h6>D. Yellow</h6>
              </div>
            </div>
            <div class="question">
              <div>
                <h4>
                  What color nicely complements the color purple according to
                  the textbook?
                </h4>
              </div>
              <div class="choices">
                <h6>A. Black</h6>
                <h6>B. Orange</h6>
                <h6>C. Cyan</h6>
                <h6>D. Yellow</h6>
              </div>
            </div>
          </div>
        {/if}
      </div>
      <div>
        <button id="submit">Submit Quiz</button>
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

  .resources {
    width: 600px;
    height: 100%;
    display: grid;
    grid-template-rows: 100px;
    justify-content: center;
  }

  .resources > div {
    width: 550px;
    height: 100%;
    font-size: small;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
  }

  .resources > div > div {
    height: 100px;
    width: 294px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid black;
  }

  .resourceButton {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 50px;
    justify-content: center;
  }

  #submit {
    width: 650px;
    height: 41px;
  }

  .quiz {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 5px 120px;
  }

  .choices {
    margin-left: 20px;
  }
</style>
