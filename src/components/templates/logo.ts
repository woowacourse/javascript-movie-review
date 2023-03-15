import { LogoState } from '../../types/logo';

export const showLogoTemplate = ({ src, alt }: LogoState) =>
  /* html */
  `
		<h1>
			<img src=${src} alt="${alt}" />
		</h1>
	`;
