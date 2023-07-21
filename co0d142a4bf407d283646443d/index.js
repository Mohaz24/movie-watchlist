let movieArr = [];
let localStrgArr = [];
let emptyStr = "";
let length = 122;

let arrayMatch = localStorage.getItem("arrayMatch")
  ? JSON.parse(localStorage.getItem("arrayMatch"))
  : []; // here

const APIKEY = "aba2f226";
let title = document.getElementById("movie--input");
const displayMoviesHtml = document.getElementById("movie---content");

document.addEventListener("click", (e) => {
  if (e.target.dataset.search) {
    movieSearchUp();
  } else if (e.target.dataset.add) {
    addToWatchList(e.target.dataset.add);
    addToLocalStorage(arrayMatch);
  }
});

document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();
  movieSearchUp();
});

function addToWatchList(id) {
  for (let movie of localStrgArr) {
    if (id === movie.imdbID && !arrayMatch.some((m) => m.imdbID == id)) {
      arrayMatch.unshift(movie);
    }

    console.log(movie);
  }
  return arrayMatch;
}

function movieSearchUp() {
  if (title.value) {
    fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&s=${title.value}`)
      .then((res) => res.json())
      .then((data) => {
        movieApp(data.Search);
        movieArr = [];
      });
  }
  // Clear inputField
  clearInputField("");
}

function movieApp(movie) {
  movie.forEach((movies) => {
    fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&t=${movies.Title}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        // All elements that need to render
        movieArr.unshift(data);
        localStrgArr.unshift(data);
        moviesRenderingHTML();
      });
  });
}

function moviesRenderingHTML() {
  emptyStr = movieArr
    .map((movie) => {
      const { Poster, Title, imdbRating, Runtime, Plot, Genre, imdbID } = movie;
      return `
        <section id="movie---info">
            <img src="${Poster}" class="movie---poster" alt="" />
            <div>
            <h1 class="inverse movie---name">${Title} <img src="./icons/star.png" alt="" />
            <span class="inverse movie---rating">${imdbRating}</span>
            </h1>
            <p class="inverse movie---time">${Runtime} <span class="inverse movie---genre">${Genre}</span>
            <span><img id="icon"   src="./icons/add.png" data-add="${imdbID}"/>Watchlist</span>
            </p>
            <p class="inverse movie---plot"> ${Plot} </p>
            </div>
        </section>
        
        `;
    })
    .join(" ");

  // Render the data
  render(emptyStr);
}

function clearInputField(clearPlaceholder) {
  title.value = clearPlaceholder;
}

function render(dataResults) {
  displayMoviesHtml.innerHTML = dataResults;
}

function addToLocalStorage(array) {
  localStorage.setItem("arrayMatch", JSON.stringify(array));
}

// localStorage.clear()
