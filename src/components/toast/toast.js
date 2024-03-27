function toast(errorMessage) {
  const toastElement = document.createElement("div");
  toastElement.classList.add("toast");
  toastElement.textContent = errorMessage;
  toastElement.setAttribute("aria-live", "assertive");

  document.querySelector("body").appendChild(toastElement);

  setTimeout(() => toastElement.remove(), 4500);
}

export default toast;