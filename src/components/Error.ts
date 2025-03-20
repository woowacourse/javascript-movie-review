interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  const $error = document.createElement("div");

  return `           
    <div class="error close">
      <img src="./images/woowawa_planet.svg" alt="woowawa_planet" />
      <h2>${message}</h2>
    </div>`;
}
