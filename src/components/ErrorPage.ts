export function ErrorPage(errorMessage: string) {
  return `
        <div id="error-container">${errorMessage}</div>
    `;
}
