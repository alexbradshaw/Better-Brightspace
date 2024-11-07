<script lang="ts">
  import { enhance } from '$app/forms';
  import { modalVisible } from '$lib/store.js';

  let closeModal = () => {
    modalVisible.set(false);
  };
</script>

<div id="container" on:click={closeModal}>
  <form method="POST" on:click|stopPropagation use:enhance>
    <h2>New Resource</h2>
    <div class="input">
      <label for="resource">Resource</label>
      <input
        type="text"
        name="resource"
        id="resource"
        placeholder="Link to Website"
      />
    </div>
    <div class="input">
      <label for="type">Resource Type</label>
      <input type="text" name="type" id="type" placeholder="PDF" />
    </div>
    <div id="submitContainer">
      <input type="submit" value="Add New Resource" />
    </div>
  </form>
</div>

<style>
  #container {
    width: 100vw;
    height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
    background-color: gray;
  }

  h2 {
    text-align: center;
  }

  form {
    background-color: white;
    display: grid;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 50px 65px;
  }

  .input {
    display: grid;
    grid-template-columns: 1fr;
  }

  label {
    margin: 5px 0px;
  }

  #submitContainer {
    display: grid;
    justify-content: center;
    align-items: center;
  }

  input[type='submit'] {
    margin-top: 15px;
    padding: 10px;
  }
</style>
