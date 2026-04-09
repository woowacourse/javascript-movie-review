interface RenderErrorProps {
  container: HTMLElement | null;
  message: string;
}

export const renderError = ({ container, message }: RenderErrorProps) => {
  if (container) {
    container.textContent = message;
  }
};
