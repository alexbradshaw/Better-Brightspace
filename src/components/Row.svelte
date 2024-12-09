<script lang="ts">
  import { resources } from '$lib/store';

  export let resource;
  export let type;
  export let size;
  export let id: number;

  const deleteItem = async (id: number) => {
    const params = new URLSearchParams();
    params.append('id', id.toString());

    console.log(id);

    const deleteResp = await fetch('?/delete', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      body: params.toString(),
    });

    if (deleteResp.ok) {
      resources.update((resources) =>
        resources.filter((resource) => {
          if (resource.id != id) {
            return resource;
          }
        }),
      );
    }
  };
</script>

<div id="row" data-value={id.toString()}>
  <div>{resource}</div>
  <div>{type}</div>
  <div>{size}</div>
  <div><button class="delete" on:click={() => deleteItem(id)}>x</button></div>
</div>

<style>
  #row {
    width: 600px;
    height: 100px;
    display: grid;
    grid-template-columns: 3fr 2fr 1fr 0.9fr;
    grid-template-rows: 100px;
    justify-content: center;
  }

  #row > div {
    display: grid;
    justify-content: center;
    align-items: center;
    border: solid black;
    border-width: 0px 0px 1px 1px;
  }

  #row > div:first-child {
    border-width: 0px 0px 1px;
    font-size: x-small;
    text-align: center;
  }

  .delete {
    background-color: red;
    border-radius: 10px;
    width: 35px;
    aspect-ratio: 1/1;
  }

  .delete:hover {
    opacity: 80%;
    cursor: pointer;
  }
</style>
