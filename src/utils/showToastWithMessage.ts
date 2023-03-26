const showToastWithMessage = (messageText: string) => {
  const notification = document.getElementById("notification");

  if (notification instanceof HTMLDivElement) {
    notification.innerText = messageText + " 🫡";
    notification.classList.toggle("show");
    setTimeout(() => {
      notification.classList.toggle("show");
    }, 3000);
  }
};

export default showToastWithMessage;
