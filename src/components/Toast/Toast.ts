type ToastType = "error" | "info";

interface IToast {
  showToast(message: string, type?: ToastType, duration?: number): void;
  resetToast(): void;
}

const Toast: IToast = {
  showToast(message, type = "error", duration = 5000) {
    if (type === "info") duration = 2000;
    let toastContainer = document.querySelector(
      ".toast-container"
    ) as HTMLDivElement | null;
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    if (type === "error") {
      message = message.replace("[ERROR]", "");
    }
    toast.innerHTML = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, duration);

    toast.addEventListener("click", () => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    });
  },

  resetToast() {
    const toastContainer = document.querySelector(
      ".toast-container"
    ) as HTMLDivElement | null;
    if (toastContainer) toastContainer.remove();
  },
};

export default Toast;
