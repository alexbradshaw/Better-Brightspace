<nav>
  <section id="upperNav">
    <div>
      <img src="" alt="logo" />
      <h3>CSCI 4800 Human Computer Interaction</h3>
      <a href="#"><h3>View All Courses</h3></a>
      <h3>Hemadri Jayalath</h3>
    </div>
  </section>
  <section id="courseNav">
    <div>
      <a href="/">Home</a>
      <a href="#">Assignments</a>
      <a href="/grading">Grading</a>
      <a href="/messaging">Messaging</a>
    </div>
  </section>
</nav>

<style>
  * {
    background-color: #fafbff;
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
