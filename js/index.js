const BASE_URL = 'https://api.themoviedb.org/3'
const img_url = 'https://image.tmdb.org/t/p/original'
const api_key = "api_key=2fa8f297328a4293f06805fe0c1b915d"

const endpoints = {
    no_playing: "/movie/now_playing",
    0: "/trending/movie/week",
    1: "/movie/popular",
    2: "/movie/upcoming",
    3: "/movie/top_rated",
    searchMovie: "/search/movie?query="
}

function fetchFilms(endpoints) {
    const lang = endpoints.includes("=") ? "&language=ru&" : "?language=ru&"
    return fetch(BASE_URL + endpoints + lang + api_key)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data
        })
}

// DOM elements
const divBox = document.querySelector(".movies-no-playing");
const buttons = document.querySelectorAll(".buttons button");
const recommendedMovies = document.querySelector(".recommended-movies")
const searchInput = document.querySelector("#search")
const searchBtn = document.querySelector("#search-btn")


// /search/movie?query=panda

searchBtn.onclick = () => {
    console.log(searchInput.value);
    fetchFilms(endpoints.searchMovie + searchInput.value).then(movies => {
        console.log(movies);
    })
}



for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
        console.log(i);
        buttons.forEach(btn => {
            btn.classList.remove("active");
        })
        buttons[i].classList.add("active");

        fetchFilms(endpoints[i]).then(movies => {
            console.log(movies);
            renderMovies(recommendedMovies, movies.results)
        })
    })
}



fetchFilms(endpoints.no_playing).then(d => {
    console.log(d.results);
    for (const movie of d.results) {
        divBox.innerHTML += `
        <div class="movie-top">
                <img src="${img_url}${movie.poster_path}" alt="" />
                <div class="movie-bottom">
                    <h3 >${movie.title}</h3>
                    <p>${movie.release_date}</p>
                    <div class="imdb">
                        <img src="../images/imdb.svg" alt="" />
                        <span>${movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        `
    }
})

fetchFilms(endpoints.no_playing).then(d => {
    renderMovies(divBox, d.results)
})


// render - росовать, показать
function renderMovies(box, films) {
    box.innerHTML = "";
    for (const movie of films) {
        box.innerHTML += `
        <div class="movie-top">
                <img src="${img_url}${movie.poster_path}" alt="" />
                <div class="movie-bottom">
                    <h3 >${movie.title}</h3>
                    <p>${movie.release_date}</p>
                    <div class="imdb">
                        <img src="../images/imdb.svg" alt="" />
                        <span>${movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        `
    }
}

fetchFilms(endpoints[0]).then(movies => {
    renderMovies(recommendedMovies, movies.results);
});