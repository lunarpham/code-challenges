import { Elements } from "../scripts/elements.js";
import { errorHandler } from "../scripts/errorHandler.js";

export function renderMovieDetails(movie) {
  const app = Elements.app;
  if (movie.Response === "False" && movie.Error) {
    app.innerHTML = errorHandler(movie.Error);
  } else {
    app.innerHTML = movieDetailsElement(movie);
  }
}

function movieDetailsElement(movie) {
  return /*html*/ `
  <div class="movie-details">
    <div class="movie-details__poster">
      <img src="${movie.Poster}" alt="poster" />
    </div>
    <div class="movie-details__info">
      <div class="movie-details__first-row">
        <h1 class="movie-details__title" id="title">
          ${movie.Title}
        </h1>
        <div class="movie-details__rating">
          <figure class="movie-details__rating-star">
            <svg focusable="false" viewBox="0 0 24 24" color="#e4bb24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
          </figure>
          <div class="movie-details__rating-value">
            <span class="movie-details__rating-score" id="rating"
              >${movie.imdbRating || "N/A"}<span>/10</span></span
            >
            <span class="movie-details__rating-votes" id="votes"
              >${movie.imdbVotes || "N/A"}</span
            >
          </div>
        </div>
      </div>
      <div class="movie-details__second-row" id="duration">
        <span>${movie.Year || "N/A"}</span>
        <span>${movie.Rated || "N/A"}</span>
        <span>${movie.Released || "N/A"}</span>
        <span>${movie.Runtime || "N/A"}</span>
      </div>
      <div class="movie-details__third-row">
        <p id="plot">
        ${movie.Plot || "N/A"}
        </p>
      </div>
      <hr class="divider"></hr>
      <div class="movie-details__fourth-row">
        <div class="movie-details__info-row">
          <span class="movie-details__info-head">Genre :</span>
          <span id="genre" class="movie-details__info-text">${
            movie.Genre || "N/A"
          }</span>
        </div>
        <div class="movie-details__info-row">
          <span class="movie-details__info-head">Director :</span>
          <span id="director" class="movie-details__info-text">${
            movie.Director || "N/A"
          }</span>
        </div>
        <div class="movie-details__info-row">
          <span class="movie-details__info-head">Writer :</span>
          <span id="writter" class="movie-details__info-text">${
            movie.Writer || "N/A"
          }</span>
        </div>
        <div class="movie-details__info-row">
          <span class="movie-details__info-head">Actors :</span>
          <span di="actors" class="movie-details__info-text">${
            movie.Actors || "N/A"
          }</span>
        </div>
        <div class="movie-details__info-row">
          <span class="movie-details__info-head">Language :</span>
          <span id="language" class="movie-details__info-text">${
            movie.Language
          }</span>
        </div>
        <div class="movie-details__info-row">
          <span class="movie-details__info-head">Country :</span>
          <span id="country" class="movie-details__info-text">${
            movie.Country || "N/A"
          }</span>
        </div>
        <div class="movie-details__info-row">
          <span class="movie-details__info-head">Awards :</span>
          <span id="awards" class="movie-details__info-text"
            >${movie.Awards || "N/A"}</span
          >
        </div>
        <div class="movie-details__info-row">
          <span class="movie-details__info-head">Production :</span>
          <span id="production"  class="movie-details__info-text">${
            movie.Production || "N/A"
          }</span>
        </div>
      </div>
    </div>
  </div>
  `;
}
