<script lang="ts">
  import type { ActionData } from './$types';
  import {
    acceptOrDeny,
    currentUser,
    derivedVal,
    members,
    messages,
  } from '$lib/store.js';
  import { afterUpdate, onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { conversionStep } from '$lib';

  export let form: ActionData;
  export let data;

  let container: HTMLElement;
  let select: HTMLSelectElement;
  let userId: HTMLInputElement;
  let memberInput: HTMLInputElement;
  let update = false;

  $: if (form?.newMessage) {
    messages.update((value) => [...value, form.newMessage]);
    update = true;
  }

  onMount(() => {
    messages.set(data.message);
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 1);
  });

  afterUpdate(() => {
    if (container && update) {
      container.scrollTop = container.scrollHeight;
      update = false;
    }
    if (memberInput) {
      memberInput.value = $derivedVal;
    }
    if (userId) {
      userId.value = '' + $currentUser.id;
    }
    setTimeout(() => {
      currentUser.set($currentUser);
    }, 1);
  });

  const remove = (id: number): void => {
    if ($members.length > 2) {
      const newArr = $members.filter((member) => {
        if (id != member.id) {
          return member;
        }
      });

      members.set(newArr);
    }
  };

  const memberCheck = (members: number[]): boolean => {
    let passedCheck = false;

    if (members.length == $members.length) {
      for (let i = 0; i < $members.length; i++) {
        if (members.includes($members[i].id)) {
          passedCheck = true;
        } else {
          passedCheck = false;
          break;
        }
      }
    }

    return passedCheck;
  };

  const memberFilter = () => {
    let list: person[] = [];

    list = data.users.filter((user) => {
      if (!$members.includes(user)) {
        return user;
      }
    });

    return list;
  };

  const lightSwitch = (flip: boolean) => {
    acceptOrDeny.set(flip);
  };

  const addMemberToList = () => {
    members.update((members) => [
      ...members,
      data.users[JSON.parse(select.value)],
    ]);
    acceptOrDeny.set(false);
    messages.update((message) => message);
  };

  members.subscribe((members) => derivedVal.set(conversionStep(members)));
</script>

<section>
  <div id="messageBody">
    <div id="header"><h3>Messages</h3></div>
    <div id="members">
      {#each $members as member}
        {#if member.id != $currentUser.id}
          <div>
            {member.firstname}
            {#if $members.length > 2}
              <button on:click={() => remove(member.id)}> X </button>
            {/if}
          </div>
        {/if}
      {/each}
      {#if $acceptOrDeny}
        <div>
          <select name="users" id="users" bind:this={select}>
            {#each memberFilter() as member}
              <option value={member.id}>
                {member.firstname + ' ' + member.lastname}
              </option>
            {/each}
          </select>
          <button on:click={() => addMemberToList()}> ✔ </button>
          <button on:click={() => lightSwitch(false)}> X </button>
        </div>
      {:else if $members.length != data.users.length}
        <div>
          Add Member<button on:click={() => lightSwitch(true)}>+</button>
        </div>
      {/if}
    </div>
    <div id="messages" bind:this={container}>
      {#key $members}
        {#each $messages as message}
          {#if memberCheck(message.members)}
            <div
              class={message.userid != $currentUser.id ? 'left' : 'right'}
              id={message.id.toString()}
            >
              <div>
                {message.body}
              </div>
            </div>
          {/if}
        {/each}
      {/key}
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </div>
    <form method="POST" id="text" use:enhance>
      <textarea name="message" placeholder="Super awesome message!"></textarea>
      <input id="userId" type="number" name="userId" bind:this={userId} />
      <input
        id="memberList"
        type="text"
        name="memberList"
        bind:this={memberInput}
      />
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
    grid-template-rows: 55px 30px 1fr 100px;
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

  #members {
    display: flex;
    justify-content: start;
    align-items: center;
    z-index: 3;
    background-color: white;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  #members::-webkit-scrollbar {
    display: none;
  }

  #members div {
    height: 25px;
    display: flex;
    align-items: center;
    margin: 0px 7px;
    padding: 0px 10px;
    border: 1px solid black;
  }

  #members button {
    margin-left: 5px;
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

  #text input {
    position: relative;
    left: 32px;
    width: 70px;
    height: 50px;
  }

  #userId,
  #memberList {
    display: none;
  }
</style>
