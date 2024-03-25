interface Props {
  title: HTMLElement;
  searchBox: HTMLElement;
}

const Header = ({ title, searchBox }: Props) => {
  const header = document.createElement('header');

  header.appendChild(title);
  header.appendChild(searchBox);

  return header;
};

export default Header;
