document.getElementById('buscarBoton').addEventListener('click', () => {
    const query = document.getElementById('buscarInput').value;
    if (query) {
        fetchMovies(query);
    } else {
        Swal.fire('Error', 'Por favor ingresa una película para buscar', 'error');
    }
});

const favorites = [];

async function fetchMovies(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1320caedfbb62c1f7c36b7fc86cb6dd5&query=${query}&language=es-ES`);
        const data = await response.json();
        if (data.results.length > 0) {
            displayMovies(data.results);
        } else {
            Swal.fire('No encontrado', 'No se encontraron resultados', 'warning');
        }
    } catch (error) {
        Swal.fire('Error', 'Hubo un problema con la búsqueda', 'error');
    }
}

function displayMovies(movies) {
    const container = document.getElementById('peliculaContainer');
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-card');
        movieElement.innerHTML = `
            <h3>${movie.title} (${movie.release_date.split('-')[0]})</h3>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <button onclick="showDetails(${movie.id})">Detalles</button>
            <button onclick="addToFavorites(${movie.id}, '${movie.title}', '${movie.poster_path}')">Añadir a Favoritos</button>
        `;
        container.appendChild(movieElement);
    });
}

async function showDetails(movieID) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=1320caedfbb62c1f7c36b7fc86cb6dd5&language=es-ES`);
    const movie = await response.json();
    Swal.fire({
        title: movie.title,
        text: movie.overview,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        imageWidth: 200,
        confirmButtonText: 'Cerrar'
    });
}

function addToFavorites(id, title, poster) {
    if (!favorites.some(movie => movie.id === id)) {
        favorites.push({ id, title, poster });
        displayFavorites();
    } else {
        Swal.fire('Info', 'Esta película ya está en favoritos', 'info');
    }
}

function displayFavorites() {
    const container = document.getElementById('favoritesContainer');
    container.innerHTML = '';
    favorites.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-card');
        movieElement.innerHTML = `
            <h3>${movie.title}</h3>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster}" alt="${movie.title}">
            <button onclick="removeFromFavorites(${movie.id})">Eliminar</button>
        `;
        container.appendChild(movieElement);
    });
}

function removeFromFavorites(id) {
    const index = favorites.findIndex(movie => movie.id === id);
    if (index !== -1) {
        favorites.splice(index, 1);
        displayFavorites();
    }
}
