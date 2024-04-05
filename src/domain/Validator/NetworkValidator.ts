function checkNetworkStatus(): Promise<boolean> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', window.location.href);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(true);
      } else {
        resolve(false);
      }
    };

    xhr.onerror = () => {
      resolve(false);
    };

    xhr.send();
  });
}

export default checkNetworkStatus;
