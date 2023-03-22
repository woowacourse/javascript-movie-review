import { LogoState } from '../../types/logo';

export const showLogoTemplate = ({ id, src, alt }: LogoState) =>
  /* html */
  `
		<h1>
			<img id=${id} src=${src} alt="${alt}" />
		</h1>
	`;
