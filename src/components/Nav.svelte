<script lang="ts">
  import logo from '$lib/logo.png';
  import { currentUser, currentUserId } from '$lib/store';

  export let users: person[];

  currentUserId.subscribe((id) => {
    currentUser.set(users[id]);
  });
</script>

<nav>
  <section id="upperNav">
    <div>
      <a
        href="https://github.com/alexbradshaw/Better-Brightspace"
        target="_blank"
      >
        <img src={logo} alt="logo" />
      </a>
      <h3>CSCI 4800 Human Computer Interaction</h3>
      <a href="/"><h3>View All Courses</h3></a>
      <label for="users">Active User:</label>
      <select name="users" id="users" bind:value={$currentUserId}>
        {#each users as user}
          <option value={user.id}>
            {user.firstname + ' ' + user.lastname}
          </option>
        {/each}
      </select>
    </div>
  </section>
  <section id="courseNav">
    <div>
      <a href="/">Home</a>
      <a href="/assignments">Assignments</a>
      {#if $currentUser.teacher}
        <a href="/grading">Grading</a>
      {:else}
        <a href="/grades">Grades</a>
      {/if}
      <a href="/messaging">Messaging</a>
    </div>
  </section>
</nav>

<style>
  * {
    background-color: #fafbff;
  }

  img {
    width: 40px;
    border-radius: 10px;
  }

  #upperNav {
    display: grid;
    justify-content: center;
    border-top: 4px solid rgba(185, 5, 5, 0.754);
    text-align: center;
  }

  #upperNav > div {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr 1fr;
    justify-content: center;
    grid-auto-flow: column;
    align-items: center;
  }

  a {
    text-decoration: none;
  }

  a:link {
    color: black;
  }

  a:visited {
    color: black;
  }

  a:hover {
    color: rgb(106, 106, 247);
    opacity: 60%;
  }

  #courseNav {
    padding-left: 160px;
    height: 40px;
    display: grid;
    border: solid grey;
    border-width: 2px 0px;
  }

  #courseNav > div {
    width: 600px;
    display: grid;
    grid-template-columns: 0.8fr 1fr 0.8fr 1fr;
    align-items: center;
    justify-content: center;
  }
</style>
