let watch = "";
const renderHTML = document.getElementById("watchlist---content");

document.addEventListener("click", (e) => {
  if (e.target.dataset.remove) {
    movieRemove(e.target.dataset.remove);
  }
});

function retrieveData() {
  let datas = localStorage.getItem("arrayMatch")
    ? JSON.parse(localStorage.getItem("arrayMatch"))
    : [];
  if (datas.length) {
    watch = datas.map((data) => {
      const { Poster, Title, imdbRating, Runtime, Plot, Genre, imdbID } = data;
      return `
        <section id="movie---info">
        <img src="${Poster}" class="movie---poster" alt="" />
        <div>
        <h1 class="inverse movie---name">${Title} <img src="./icons/star.png" alt="" />
        <span class="inverse movie---rating">${imdbRating}</span>
        </h1>
        <p class="inverse movie---time">${Runtime} <span class="inverse movie---genre">${Genre}</span>
        <span><img id="icon"   src="./icons/remove.png" data-remove="${imdbID}" />Watchlist</span>
        </p>
        <p class="inverse movie---plot"> ${Plot} </p>
        </div>
    </section>
           `;
    });

    render(watch);
  } else if (!datas.length) {
    renderHTML.innerHTML = `
     <p class="movie--section-two-title">Your watchlist is looking a little empty...</p>
     <img class="watchlist---img" id="icon" src="./icons/add.png" alt="">
     <a class="movie---link" href="index.html">Let’s add some movies!</a>
     `;
  }
}

retrieveData();

function movieRemove(id) {
  let watch = JSON.parse(localStorage.getItem("arrayMatch"));
  for (movie of watch) {
    if (id == movie.imdbID) {
      let movieIndex = watch.indexOf(movie);
      watch.splice(movieIndex, 1);
      localStorage.setItem("arrayMatch", JSON.stringify(watch));
      retrieveData();
    }
  }
}

function render(itemValue) {
  renderHTML.innerHTML = itemValue;
}
