import { Elements as elements } from "../scripts/elements.js";

export function renderSearchForm(bindFunction) {
  const searchContainer = elements.searchContainer;
  searchContainer.innerHTML = searchFormElement();
  const searchForm = elements.searchForm;
  if (searchForm) {
    searchForm.addEventListener("submit", bindFunction);
  }
}

function searchFormElement() {
  return /*html*/ `
    <form class="search-form" id="search-form">
        <label for="movie-search" class="search-form__label">
        <input
            type="text"
            id="search-input"
            placeholder="Search for a movie"
            class="search-form__input"
        />
        <button id="searchBtn" class="search-form__button btn btn--rounded">
            <img
            src="assets/images/icon-search.svg"
            alt="search"
            class="btn__icon"
            />
            <span class="btn__ripple"></span>
        </button>
        </label>
    </form>
    `;
}
