const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';
const API_KEY = 'api_key=2fa8f297328a4293f06805fe0c1b915d';

const box = document.querySelector('.recommended-movies');
const input = document.querySelector('#search');
const btn = document.querySelector('#search-btn');

const params = new URLSearchParams(window.location.search);
const query = params.get('query');

if (query) {
    input.value = query;
    fetch(`${BASE_URL}/search/movie?query=${query}&language=ru&${API_KEY}`)
        .then(r => r.json())
        .then(d => render(d.results));
}

btn.onclick = () => {
    if (!input.value.trim()) return;
    window.location.href = `search.html?query=${input.value}`;
};

function render(movies) { 
    box.innerHTML = '';
    movies.forEach(m => {
        box.innerHTML +=
            `<div class="movie-top">
                <img src="${IMG_URL}${m.poster_path}" />
                <div class="movie-bottom">
                    <h3>${m.title}</h3>
                    <div class="movie-meta">
                        <span>${m.release_date ? m.release_date.slice(0, 4) : ''}</span>
                        <div class="imdb">
                            <img src="../images/imdb.svg" />
                            <span>${m.vote_average ? m.vote_average.toFixed(1) : ''}</span>
                        </div>
                    </div>
                    <p class="overview">
                        ${m.overview ? m.overview : 'Нет описания'}
                    </p>
                </div>
            </div>`
            ;
    });
}