export const getFormData = (event: Event) => {
  if (event.target instanceof HTMLFormElement) {
    const formData = new FormData(event.target);

    return [...formData];
  }
};
