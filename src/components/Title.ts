const Title = (text: string) => {
  const $title = document.createElement("h2");
  $title.textContent = text;

  return $title;
};
export default Title;
