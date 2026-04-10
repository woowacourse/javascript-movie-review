const TOAST_DURATION_MS = 5000;

function createToast({ title, message }: { title?: string, message: string }): HTMLElement {
  const toast = document.createElement("div");
  toast.className = "toast";

  const body = document.createElement("div");

  const titleEl = document.createElement("p");
  titleEl.className = "toast-title";
  titleEl.textContent = title ?? "";
  body.appendChild(titleEl);

  const messageEl = document.createElement("p");
  messageEl.className = "toast-message";
  messageEl.textContent = message;
  body.appendChild(messageEl);

  const closeBtn = document.createElement("button");
  closeBtn.className = "toast-close";
  closeBtn.setAttribute("aria-label", "닫기");
  closeBtn.textContent = "✕";

  toast.appendChild(body);
  toast.appendChild(closeBtn);;
  closeBtn.addEventListener("click", () => removeToast(toast));

  return toast;
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

export function showErrorToast({ title, message }: { title?: string, message: string }): void {
  const container = getOrCreateContainer();
  const toast = createToast({ title, message });
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.isConnected) removeToast(toast);
  }, TOAST_DURATION_MS);
}
