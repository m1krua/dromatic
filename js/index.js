const BASE_URL = 'https://api.themoviedb.org/3'
const img_url = 'https://image.tmdb.org/t/p/original'
const api_key = "api_key=2fa8f297328a4293f06805fe0c1b915d"

const endpoints = {
    no_playing: "/movie/now_playing"
}

function fetchFilms(endpoint) {
    return fetch(BASE_URL + endpoint + "?language=ru&" + api_key)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data
        })
}

// DOM elements
const divBox = document.querySelector(".movies-no-playing");

fetchFilms(endpoints.no_playing).then(d => {
    console.log(d.results);
    for (const movie of d.results) {
        divBox.innerHTML += `
        <div>
            <img src="${img_url}${movie.poster_path}" alt="" />
            <div>
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
            <img src="../images/imdb.svg" alt=""/>
            <span>${movie.vote_average.toFixed(1)}</span>
            </div>
        </div>
        `
    }
})

