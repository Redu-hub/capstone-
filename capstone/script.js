
function addMovie() {
    const title = document.getElementById("title").value.trim();
    const image = document.getElementById("image").value.trim();
    const description = document.getElementById("description").value.trim();
  
    if (!title  !image  !description) {
      alert("Please fill in all fields!");
      return;
    }
  
    const card = document.createElement("div");
    card.className = "movie-card";
  
  
  
    document.getElementById("movie-list").appendChild(card);
  
    // Clear input fields
    document.getElementById("title").value = "";
    document.getElementById("image").value = "";
    document.getElementById("description").value = "";
  }
  const API_KEY = '14112bfa29e5be67fed38817f7f9a0d6'; // TMDb magic key
  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
  const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
  
  // Grab movie details from TMDb based on the title
  async function fetchMovieData(title) {
    const url = ${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(title)};
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0]; // Just grabbing the first match
    } else {
      alert('Couldn’t find that movie – try something else!');
      return null;
    }
  }
  
  document.getElementById('movie-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const image = document.getElementById("image").value.trim();
    let description = document.getElementById("description").value.trim();
  
    if (!title || !description) {
      alert("Fill out everything, buddy!");
      return;
    }
  
    // If no image, let’s try to grab one from TMDb
    let movieImage = image;
    if (!movieImage) {
      const movieData = await fetchMovieData(title);
      if (movieData) {
        movieImage = IMAGE_BASE + movieData.poster_path;
        description = movieData.overview;
      }
    }
  
    const newMovie = { title, image: movieImage, description };
    createCard(newMovie);
  
    // Store the movie locally so it sticks around
    const existing = JSON.parse(localStorage.getItem('movies')) || [];
    existing.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(existing));
  
    // Clear the form for the next one
    document.getElementById("title").value = "";
    document.getElementById("image").value = "";
    document.getElementById("description").value = "";
  });
  
  // Build the movie card and slap it on the page
  function createCard({ title, image, description }) {
    const card = document.createElement("div");
    card.className = "movie-card";
  
    const img = document.createElement("img");
    img.src = image;
    img.alt = title;
  
    const content = document.createElement("div");
    content.className = "content";
  
    const h3 = document.createElement("h3");
    h3.textContent = title;
  
    const p = document.createElement("p");
    p.textContent = description;
  
    content.appendChild(h3);
    content.appendChild(p);
  
    card.appendChild(img);
    card.appendChild(content);
    document.getElementById("movie-list").appendChild(card);
  }
  
  // On page load, bring back any movies we saved earlier
  window.addEventListener('load', () => {
    const saved = localStorage.getItem('movies');
    if (saved) {
      JSON.parse(saved).forEach(movie => createCard(movie));
    }
  }); 
  