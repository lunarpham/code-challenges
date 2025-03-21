import { DefaultConfig as config } from "./scripts/config.js";
import { Elements as elements } from "./scripts/elements.js";
import { initRippleEffect } from "./scripts/utils.js";
import { getMovieDetails, searchMovies } from "./scripts/fetch.js";
import { renderHeader } from "./components/Header.js";
import { renderSearchForm } from "./components/SearchForm.js";
import { renderMovies } from "./components/MovieList.js";
import { renderMovieDetails } from "./components/MovieDetails.js";
import { errorHandler } from "./scripts/errorHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  initRippleEffect();
  const app = App();
  app.loadOnStart();
});

export default function App() {
  /* General variables */
  const apiUrl = config.API_URL;
  const apiKey = config.OMDB_API_KEY;
  const defaultSearch = config.DEFAULT_SEARCH;
  const staticValue = `${apiUrl}?apikey=${apiKey}`;

  /* Loading indicators */
  let currentPage = 1; // Default page
  let loading = false; // Loading state
  let currentSearch = defaultSearch; // Default search term
  let hasMoreResults = true; // Check if there are more results

  loadOnStart();
  function loadOnStart() {
    initApp();
    setupInfinteScroll();
  }

  function setupInfinteScroll() {
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading && // Check if we're already loading
        hasMoreResults && // Check if there are more results
        !window.location.search // Check if we're not on homepage (index route)
      ) {
        loadMoreMovies();
      }
    });
  }

  async function initApp() {
    renderHeader();
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");
    if (movieId) {
      const movieDetails = await getMovieDetails(staticValue, movieId);
      renderMovieDetails(movieDetails);
    } else {
      renderSearchForm(searchMoviesByTerm);
      currentPage = 1;
      loading = true;
      const movieList = await searchMovies(
        staticValue,
        currentSearch,
        currentPage
      );
      await renderMovies(movieList);
      loading = false;
    }
  }

  async function searchMoviesByTerm(event) {
    event.preventDefault();
    const searchInput = elements.searchInput;
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;
    if (searchTerm === currentSearch) return;
    currentSearch = searchTerm;
    currentPage = 1;
    hasMoreResults = true;

    loading = true;

    try {
      const movieList = await searchMovies(
        staticValue,
        searchTerm,
        currentPage
      );

      await renderMovies(movieList);
    } catch (error) {
      errorHandler(error);
    } finally {
      loading = false;
    }
  }

  async function loadMoreMovies() {
    if (loading) return;
    loading = true;
    currentPage++;

    try {
      const moreMovies = await searchMovies(
        staticValue,
        currentSearch,
        currentPage
      );

      if (moreMovies.length === 0) {
        hasMoreResults = false;
      }

      await renderMovies(moreMovies, false);
    } catch (error) {
      hasMoreResults = false;
    } finally {
      loading = false;
    }
  }

  return {
    loadOnStart,
    setupInfinteScroll,
    initApp,
    loadMoreMovies,
    searchMoviesByTerm,
  };
}
