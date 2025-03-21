import { Elements } from "../scripts/elements.js";
import { getStartYearOnly } from "../scripts/utils.js";
import { errorHandler } from "../scripts/errorHandler.js";

export function renderMovies(movieList, shouldClear = true) {
  const movieListElement = Elements.movieList;

  // Clear existing content if needed
  // This options will be useful when we want to clear the list or not
  // Use cases: search results will require clearing the list (list = new results)
  // While infinite scroll will require appending to the list (list = old results + new results)
  if (shouldClear) {
    movieListElement.innerHTML = "";
  }

  // Add skeleton loaders
  const skeletonLoaders = createSkeletonLoaders(10);
  skeletonLoaders.forEach((loader) => movieListElement.appendChild(loader));

  return new Promise((resolve) => {
    // This simulates loading time in 500ms (0.5s) to show skeleton loaders
    // This is to give the user a sense of loading time instead of instantly showing the content
    setTimeout(() => {
      // Remove skeleton loaders
      skeletonLoaders.forEach((loader) => loader.remove());

      if (movieList.Response === "False" && movieList.Error) {
        movieListElement.innerHTML = errorHandler(movieList.Error);
        return;
      }

      // Either replace or append content
      if (shouldClear) {
        movieListElement.innerHTML = createMovieCards(movieList);
        // This kind of action will clear the list and replace it with new content
        // This is useful for search results where we want to replace the old list with new results
        // Or in case the page is loaded for the first time
      } else {
        movieListElement.innerHTML += createMovieCards(movieList);
        // This kind of action sacrifices performance for user experience
        // Since we need to constantly update the DOM in a loop (by appending each card to the list in order)
        // This is fine for small lists but can be slow for large lists
        // The more efficient way is to use a DocumentFragment (which mean we create a list
        // outside the DOM and we only update the DOM once by appeding the list to the DOM)
      }
      resolve(); // Resolve the promise
    }, 500);
  });
}

function createMovieCards(movieList) {
  return movieList
    .map(
      (movie) => /*html*/ `
      <a href="?id=${movie.imdbID}" class="movie">
        <div class="movie-card">
          <button class="movie-card__above">
            <img
              src="${movie.Poster}"
              alt="${movie.Title} poster"
              alt="movie poster"
              class="movie-card__image"
            />
            <h3 class="movie-card__title">${movie.Title}</h3>
          </button>
          <div class="movie-card__below">
            <div class="movie-card__release-year">
              <img
                src="assets/images/icon-calendar.svg"
                alt="calendar"
                class="btn__icon"
              />
              <p>${getStartYearOnly(movie.Year)}</p>
            </div>
            <div class="movie-card__favorite">
              <button class="btn btn--rounded">
                <img
                  src="assets/images/icon-heart.svg"
                  alt="heart"
                  class="btn__icon"
                />
                <span class="btn__ripple"></span>
              </button>
            </div>
          </div>
        </div>
      </a>
  `
    )
    .join("");
}

function createSkeletonLoaders(count) {
  const skeletonLoaders = [];
  for (let i = 0; i < count; i++) {
    const movie = document.createElement("div");
    movie.className = "movie";
    movie.innerHTML = /*html*/ `
      <div class="movie-card movie-card--skeleton">
        <div class="movie-card__above">
          <div class="movie-card__image"></div>
          <div class="movie-card__title">
            <span></span>
          </div>
        </div>
        <div class="movie-card__below">
          <div class="movie-card__release-year"></div>
          <div class="movie-card__favorite"></div>
        </div>
      </div>`;
    skeletonLoaders.push(movie);
  }
  return skeletonLoaders;
}
