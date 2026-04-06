const TOAST_DURATION_MS = 5000;

function createToast({ title, message }: { title?: string, message: string }): HTMLElement {
  const toast = document.createElement("div");
  toast.className = "toast";

  toast.innerHTML = `
    <div>
      <p class="toast-title">${title}</p>
      <p class="toast-message">${message}</p>
    </div>
    <button class="toast-close" aria-label="닫기">✕</button>
  `;

  const closeBtn = toast.querySelector<HTMLButtonElement>(".toast-close")!;
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
