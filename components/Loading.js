import { Elements } from "../scripts/elements.js";

export function renderLoading() {
  const loadingElement = document.createElement("div");
  loadingElement.className = "loading-screen";
  loadingElement.innerHTML = `<div class="loading-screen__spinner"></div>`;

  Elements.app.appendChild(loadingElement);

  return loadingElement;
}

export function removeLoading(loadingElement) {
  if (loadingElement && loadingElement.parentNode) {
    loadingElement.parentNode.removeChild(loadingElement);
    return;
  }

  const loadingScreens = document.querySelectorAll(".loading-screen");
  loadingScreens.forEach((screen) => {
    if (screen.parentNode) {
      screen.parentNode.removeChild(screen);
    }
  });
}
