import { DefaultConfig as config } from "./scripts/config.js";
import { Elements as elements } from "./scripts/elements.js";
import { initRippleEffect, convertString } from "./scripts/utils.js";
import { getMovieDetails, searchMovies } from "./scripts/fetch.js";
import { renderHeader } from "./components/Header.js";
import { renderSearchForm } from "./components/SearchForm.js";
import { renderMovies } from "./components/MovieList.js";
import { renderMovieDetails } from "./components/MovieDetails.js";
import { errorHandler } from "./components/Error.js";
import { renderLoading, removeLoading } from "./components/Loading.js";
import { simulateLoadingDelay } from "./scripts/utils.js";

document.addEventListener("DOMContentLoaded", async () => {
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

  function loadOnStart() {
    initApp();
    setupInfinteScroll();
    setPopStateListener();
  }

  function setupInfinteScroll() {
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading && // Check if we're already loading
        hasMoreResults &&
        window.location.pathname === "/" // Check if there are more results
      ) {
        loadMoreMovies();
      }
    });
  }

  function setPopStateListener() {
    window.addEventListener("popstate", async () => {
      initApp();
    });
  }

  async function initApp() {
    renderHeader();
    const loadingElement = renderLoading();
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");
    const search = urlParams.get("s");

    try {
      if (movieId) {
        const movieDetails = await getMovieDetails(staticValue, movieId);
        return simulateLoadingDelay(
          loadingElement,
          renderMovieDetails,
          movieDetails
        );
      }
      if (window.location.pathname === "/") {
        renderSearchForm(searchMoviesByTerm);
        currentPage = 1;
        loading = true;
        currentSearch = search || defaultSearch;
        elements.searchInput.value = search || "";
        const movieList = await searchMovies(
          staticValue,
          currentSearch,
          currentPage
        );
        loading = false;
        return simulateLoadingDelay(loadingElement, renderMovies, movieList);
      }
    } catch (error) {
      removeLoading(loadingElement);
      errorHandler(error);
    }
  }

  async function searchMoviesByTerm(event) {
    event.preventDefault();
    const searchInput = elements.searchInput;
    const searchTerm = searchInput.value.trim() || defaultSearch;
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
      window.history.pushState({}, "", `/?s=${convertString(searchTerm)}`);
      renderHeader(); //update header to show back button
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
