const movieId = localStorage.getItem("id")


fetch("https://api.themoviedb.org/3/movie/" + movieId + "?language=ru&api_key=2fa8f297328a4293f06805fe0c1b915d")
  .then( res => res.json())
  .then( movie => {
    console.log(movie);
    title.innerText = movie.title
    poster.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path
    overview.textContent = movie.overview
    release_date.textContent = movie.release_date
    vote_average.textContent = movie.vote_average
    vote_count.textContent = movie.vote_count
    backdrop.src = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
  })

const title = document.querySelector("#title")
const poster = document.querySelector(".poster")
const overview = document.querySelector(".overview")
const release_date = document.querySelector(".release_date")
const vote_average = document.querySelector(".vote_average")
const vote_count = document.querySelector(".vote_count")
const backdrop = document.querySelector(".backdrop")