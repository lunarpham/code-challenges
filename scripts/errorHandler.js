export function errorHandler(error) {
  return /*html*/ `
  <div class="error">
    <h2 class="error__message">${error}</h2>
  </div>
  `;
}
