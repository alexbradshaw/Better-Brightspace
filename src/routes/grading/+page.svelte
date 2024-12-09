<script lang="ts">
  import { writable } from 'svelte/store';

  export let data;

  let activeStudent = data.people[1].id;
  let activeTemplate = data.templates[0].id;

  let problem = writable(1);
  let takeaway = writable(1);
  let surprise = writable(1);
  let suggestion = writable(1);

  $: reactiveValues = [$problem, $takeaway, $surprise, $suggestion];

  let tempStorage: number[][] = [];

  for (let i = 0; i < data.people.length; i++) {
    tempStorage.push([1, 1, 1, 1]);
  }

  let studentButton = (id: number) => {
    activeStudent = id;
    problem.set(tempStorage[id][0]);
    takeaway.set(tempStorage[id][1]);
    surprise.set(tempStorage[id][2]);
    suggestion.set(tempStorage[id][3]);
  };

  let templateButton = (id: number) => {
    activeTemplate = id;
  };

  let grid = [
    {
      title: 'Problem Area',
      shorthand: 'problem',
      criteria: [
        {
          id: 5,
          note: 'Extraordinary explanation of problem area',
        },
        {
          id: 4,
          note: 'Great explanation of problem area',
        },
        {
          id: 3,
          note: 'Identified the problem area with solid details',
        },
        {
          id: 2,
          note: 'Identified the problem area very broadly',
        },
        {
          id: 1,
          note: 'Did not explain problem area',
        },
      ],
    },
    {
      title: 'Takeaway',
      shorthand: 'takeaway',
      criteria: [
        {
          id: 5,
          note: 'Thoughtful and in depth key takeaway',
        },
        {
          id: 4,
          note: 'Takeaway summarizes pretty well, but could be a little more in depth',
        },
        {
          id: 3,
          note: 'Takeaway captures main point of the presentation',
        },
        {
          id: 2,
          note: 'Provided a Takeaway but it does not capture the point of the presentation',
        },
        {
          id: 1,
          note: 'Did not provide a takeaway',
        },
      ],
    },
    {
      title: 'Something Surprising',
      shorthand: 'surprise',
      criteria: [
        {
          id: 5,
          note: 'Provides a specific, insightful, and relevant surprise',
        },
        {
          id: 4,
          note: 'Surprise is relevant  and thoughtful',
        },
        {
          id: 3,
          note: 'Highlights something surprising, though it is slightly general',
        },
        {
          id: 2,
          note: 'Surprise is not relevant or specific',
        },
        {
          id: 1,
          note: 'Does not provide a valid surprise',
        },
      ],
    },
    {
      title: 'Suggestion/ Follow Up',
      shorthand: 'suggestion',
      criteria: [
        {
          id: 5,
          note: 'Suggestion/Follow Up question is in depth and demonstrates engagement',
        },
        {
          id: 4,
          note: 'Suggestion/ Follow Up is quite thoughtful',
        },
        {
          id: 3,
          note: 'Suggestion/Follow Up is valid but lacks depth',
        },
        {
          id: 2,
          note: 'Suggestion or Follow Up is present but not thought out',
        },
        {
          id: 1,
          note: 'Missing a Suggestion or Follow Up or it is not meaningful whatsoever',
        },
      ],
    },
  ];

  let updateCategory = (value: number, category: string) => {
    switch (category) {
      case 'problem':
        problem.set(value);
        tempStorage[activeStudent][0] = value;
        break;
      case 'takeaway':
        takeaway.set(value);
        tempStorage[activeStudent][1] = value;
        break;
      case 'surprise':
        surprise.set(value);
        tempStorage[activeStudent][2] = value;
        break;
      case 'suggestion':
        suggestion.set(value);
        tempStorage[activeStudent][3] = value;
        break;
      default:
        console.log('You shouldnt be here');
        break;
    }
    console.log(tempStorage);
  };
</script>

<section>
  <div class="left aside">
    <div class="header"><h3>Classlist</h3></div>
    {#each data.people as student}
      {#if student.id != 0}
        <button
          class:active={student.id == activeStudent}
          on:click={() => studentButton(student.id)}
          >{student.firstname} {student.lastname}</button
        >
      {/if}
    {/each}
  </div>
  <div id="quizBody">
    <div>
      <h3>
        {data.people[activeStudent].firstname}
        {data.people[activeStudent].lastname}
      </h3>
    </div>
    <div id="templateGrid">
      <div class="row">
        <div><h6>Criteria</h6></div>
        <div><h6>Perfect (5)</h6></div>
        <div><h6>Great (4)</h6></div>
        <div><h6>Proficient (3)</h6></div>
        <div><h6>Developing (2)</h6></div>
        <div><h6>Needs Improvement(1)</h6></div>
        <div><h6>Score</h6></div>
      </div>
      {#each grid as category, index}
        <div class="row">
          <div><h6>{category.title}</h6></div>
          {#each category.criteria as criteria}
            <div>
              <button
                class:active={tempStorage[activeStudent][index] == criteria.id}
                on:click={() => updateCategory(criteria.id, category.shorthand)}
              >
                {criteria.note}
              </button>
            </div>
          {/each}
          <div><h6>{reactiveValues[index]}/5</h6></div>
        </div>
      {/each}
    </div>
    <div id="footer">
      Grade {$problem + $takeaway + $surprise + $suggestion}/20 or {(
        (($problem + $takeaway + $surprise + $suggestion) / 20) *
        100
      ).toFixed(2)}%
    </div>
  </div>
  <div class="right aside">
    <div class="header"><h3>Grading Tools</h3></div>
    {#each data.templates as template}
      <button
        class:active={template.id == activeTemplate}
        on:click={() => templateButton(template.id)}>{template.name}</button
      >
    {/each}
  </div>
</section>

<style>
  section {
    width: 100%;
    height: 550px;
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
  }

  .aside {
    border: 3px solid black;
    height: 500px;
    width: 200px;
    display: grid;
    justify-items: center;
    align-content: flex-start;
    background-color: #fafbff;
  }

  .aside > button {
    display: grid;
    justify-content: center;
    align-items: center;
    width: 200px;
    min-height: 40px;
    border: solid black;
    border-width: 0px 0px 1px 0px;
    cursor: pointer;
  }

  .aside > button:hover {
    opacity: 70%;
  }

  .left {
    border-radius: 0px 20px 20px 0px;
    border-width: 3px 3px 3px 0px;
  }

  .right {
    border-radius: 20px 0px 0px 20px;
    border-width: 3px 0px 3px 3px;
  }

  .header {
    display: grid;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 50px;
    border: solid black;
    border-width: 0px 0px 2px 0px;
  }

  .active {
    background-color: rgb(172, 171, 171) !important;
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
    background-color: #fafbff;
  }

  #quizBody > div {
    display: grid;
    justify-content: center;
    width: 600px;
    height: 100%;
    border: 1px solid black;
  }

  #templateGrid {
    height: 100%;
    display: grid;
    justify-content: center;
    align-content: flex-start;
    overflow: hidden;
    text-align: center;
  }

  #footer {
    display: grid;
    justify-content: center;
    align-items: center;
    width: 650px;
    height: 41px;
  }

  .row {
    width: 600px;
    height: 81px;
    display: grid;
    grid-template-columns: 1.3fr 1fr 1fr 1fr 1fr 1fr 1.3fr;
    grid-template-rows: 81px;
    justify-content: center;
  }

  .row > div {
    width: 85px;
    display: grid;
    justify-content: center;
    align-items: center;
    border: solid black;
    border-width: 0px 0px 1px 1px;
  }

  .row > div:first-child {
    border-width: 0px 0px 1px;
  }

  .row button {
    width: 85px;
    height: 80px;
    border-radius: 0px;
    border: 0px;
    padding: 0px;
    font-size: x-small;
  }
</style>
