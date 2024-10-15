// Elements
const addMovieBtn = document.getElementById('addMovieBtn');
const viewListBtn = document.getElementById('viewListBtn');
const formSection = document.getElementById('formSection');
const listSection = document.getElementById('listSection');
const movieForm = document.getElementById('movieForm');
const movieList = document.getElementById('movieList');
const typeRadios = document.getElementsByName('type');
const seasonGroup = document.getElementById('seasonGroup');

// Show Add Movie Form
addMovieBtn.addEventListener('click', () => {
    formSection.classList.remove('hidden');
    listSection.classList.add('hidden');
});

// Show List Section
viewListBtn.addEventListener('click', () => {
    listSection.classList.remove('hidden');
    formSection.classList.add('hidden');
    displayMovies();
});

// Toggle Season Input based on Type
movieForm.addEventListener('change', (e) => {
    if (e.target.name === 'type') {
        if (e.target.value === 'Series') {
            seasonGroup.classList.remove('hidden');
            document.getElementById('season').required = true;
        } else {
            seasonGroup.classList.add('hidden');
            document.getElementById('season').required = false;
        }
    }
});

// Handle Form Submission
movieForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const type = document.querySelector('input[name="type"]:checked').value;
    const year = document.getElementById('year').value;
    const season = type === 'Series' ? document.getElementById('season').value : null;
    const dateWatched = document.getElementById('dateWatched').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value.trim();

    const movie = {
        id: Date.now(),
        title,
        type,
        year,
        season,
        dateWatched,
        rating,
        comment
    };

    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));

    movieForm.reset();
    seasonGroup.classList.add('hidden');
    document.getElementById('season').required = false;

    alert('Movie/Series added successfully!');
});

// Display Movies in List
function displayMovies() {
    movieList.innerHTML = '';
    const movies = JSON.parse(localStorage.getItem('movies')) || [];

    if (movies.length === 0) {
        movieList.innerHTML = '<li>No movies or series added yet.</li>';
        return;
    }

    movies.forEach(movie => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Title:</strong> ${movie.title} <br>
            <strong>Type:</strong> ${movie.type} <br>
            <strong>Year:</strong> ${movie.year} <br>
            ${movie.type === 'Series' ? `<strong>Season:</strong> ${movie.season} <br>` : ''}
            <strong>Date Watched:</strong> ${movie.dateWatched} <br>
            <strong>Rating:</strong> ${movie.rating}/10 <br>
            <strong>Comment:</strong> ${movie.comment || 'N/A'}
        `;
        movieList.appendChild(li);
    });
}

// Initial Display
document.addEventListener('DOMContentLoaded', () => {
    // Show list by default
    viewListBtn.click();
});
