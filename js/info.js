const movieId = localStorage.getItem("id")

const title = document.querySelector("#title")
const poster = document.querySelector(".poster")
const overview = document.querySelector(".overview")
const release_date = document.querySelector(".release_date")
const vote_average = document.querySelector(".vote_average")
const vote_count = document.querySelector(".vote_count")
const backdrop = document.querySelector(".backdrop")
const info = document.querySelector(".info")
const tagline = document.querySelector(".tagline")
const genres = document.querySelector(".genres")



fetch("https://api.themoviedb.org/3/movie/" + movieId + "?language=ru&api_key=2fa8f297328a4293f06805fe0c1b915d")
  .then(res => res.json())
  .then(movie => {
    backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
    console.log(movie);
    title.innerText = movie.title
    poster.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path
    overview.innerText = movie.overview
    release_date.innerText = movie.release_date
    vote_average.innerText = movie.vote_average.toFixed(1)
    vote_count.innerText = movie.vote_count
    backdrop.src = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
    tagline.innerText = movie.tagline
    // genres.innerText = movie.genres


    if (movie.genres && movie.genres.length > 0) {
      genres.innerText = movie.genres.map(g => g.name).join(" • ");
    } else {
      genres.innerText = "—";
    }
  })

const goBackBtn = document.querySelector(".goBack");

goBackBtn.onclick = () => {
  history.back();
};


const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");

searchBtn.onclick = () => {
  const query = searchInput.value.trim();
  if (!query) return;
  window.location.href = `search.html?query=${encodeURIComponent(query)}`;
}

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (!query) return;
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
  }
});



const playBtn = document.querySelector(".play-btn");
const trailerOverlay = document.getElementById("trailerOverlay");
const trailerFrame = document.getElementById("trailerFrame");
const trailerClose = document.getElementById("trailerClose");

playBtn.addEventListener("click", async () => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2fa8f297328a4293f06805fe0c1b915d`
        );
        const data = await res.json();

        const trailer =
            data.results.find(v => v.site === "YouTube" && v.type === "Trailer") ||
            data.results.find(v => v.site === "YouTube" && v.type === "Video") ||
            data.results.find(v => v.site === "YouTube" && v.type === "Teaser");

        if (!trailer) {
            alert("Видео не найдено 😢");
            return;
        }

        trailerFrame.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
        trailerOverlay.classList.add("active");
    } catch (err) {
        console.error(err);
    }
});

function closeTrailer() {
    trailerOverlay.classList.remove("active");
    trailerFrame.src = "";
}

trailerClose.addEventListener("click", closeTrailer);

trailerOverlay.addEventListener("click", (e) => {
    if (e.target === trailerOverlay) closeTrailer();
});