type ErrorLayoutConstructorType = {
  image: string;
  title: string;
  message: string;
};

const errorLayout = {
  getTemplate: ({ image, title, message }: ErrorLayoutConstructorType) => `
    <div class="error-layout">
      <img class="error-image" src="${image}" alt="${title}">
      <h3 class="error-title">${title}</h3>
      <p class="error-message">${message}</p>
    </div>
  `,
};

export default errorLayout;
