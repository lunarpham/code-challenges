import { removeLoading } from "../components/Loading.js";

function initRippleEffect() {
  document.addEventListener("click", (e) => {
    const target = e.target.closest(".btn");
    if (!target) return;

    // Check if there's an existing ripple - remove it first
    const existingRipple = target.querySelector(".btn__ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    // Create the ripple element
    const ripple = document.createElement("span");
    ripple.className = "btn__ripple";

    // Add ripple to button
    target.appendChild(ripple);

    // Remove the ripple after animation completes (match the 1.2s duration)
    setTimeout(() => {
      ripple.remove();
    }, 1400);
  });
}

function convertString(searchTerm) {
  return searchTerm.trim().split(" ").join("+");
}

function getStartYearOnly(year) {
  return year.split("–")[0];
}

function simulateLoadingDelay(
  loadingElement,
  renderFunction,
  data,
  delay = 200
) {
  return new Promise((resolve) => {
    setTimeout(() => {
      removeLoading(loadingElement);
      renderFunction(data);
      resolve();
    }, delay);
  });
}

export {
  initRippleEffect,
  convertString,
  getStartYearOnly,
  simulateLoadingDelay,
};
