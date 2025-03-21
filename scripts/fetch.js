import { convertString } from "./utils.js";

async function searchMovies(staticValue, searchTerm, page) {
  try {
    let pageNumber = page || 1;
    const search = convertString(searchTerm);
    const controller = new AbortController();
    const signal = controller.signal;
    const url = `${staticValue}&s=${search}&page=${pageNumber}`;
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    if (data.Search && data.Search.length !== 0) {
      const movieList = data.Search;
      return movieList;
    } else {
      return data;
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
    }
    throw new Error(error);
  }
}

async function getMovieDetails(staticValue, id) {
  try {
    const controller = new AbortController();
    const signal = controller.signal;
    const url = `${staticValue}&i=${id}&plot=full`;
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export { searchMovies, getMovieDetails };
