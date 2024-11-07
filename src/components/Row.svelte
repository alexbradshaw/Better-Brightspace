<script lang="ts">
  export let resource;
  export let type;
  export let size;
  export let id: Number;
</script>

<div id="row" data-value={id.toString()}>
  <div>{resource}</div>
  <div>{type}</div>
  <div>{size}</div>
  <div><button class="delete">x</button></div>
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
