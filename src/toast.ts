const TOAST_DURATION_MS = 5000;

function createToast({ title, message }: { title?: string, message?: string }): HTMLElement {
  const toastElement = document.createElement("div");
  toastElement.className = "toast";

  const toastContentElement = document.createElement("div");

  const toastTitleElement = document.createElement("p");
  toastTitleElement.classList.add('toast-title');
  if (title) toastTitleElement.textContent = title;
  toastContentElement.appendChild(toastTitleElement);

  const toastMessageElement = document.createElement("p");
  toastMessageElement.classList.add('toast-message');
  if (message) toastMessageElement.textContent = message;
  toastContentElement.appendChild(toastMessageElement);

  const toastCloseElement = document.createElement("button");
  toastCloseElement.classList.add('toast-close');
  toastCloseElement.ariaLabel = "닫기";
  toastCloseElement.textContent = "✕";
  toastCloseElement.addEventListener("click", () => removeToast(toastElement));

  toastElement.append(toastContentElement, toastCloseElement);

  return toastElement;
}

function removeToast(toast: HTMLElement): void {
  toast.classList.add("toast-hide");
  toast.addEventListener("animationend", () => toast.remove(), { once: true });
}

function getOrCreateContainer(): HTMLElement {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  return container;
}

export function showErrorToast({ title, message }: { title?: string, message?: string }): void {
  const container = getOrCreateContainer();
  const toast = createToast({ title, message });
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.isConnected) removeToast(toast);
  }, TOAST_DURATION_MS);
}
