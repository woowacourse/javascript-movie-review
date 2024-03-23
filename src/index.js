/* eslint-disable import/no-unresolved */
import './styles/reset.css';
import './styles/common.css';
import AppHeader from './components/app-header/AppHeader';
import { $ } from './utils/domUtils';

const $app = $('#app', document, true);
const $appHeader = AppHeader();

if ($app) $app.appendChild($appHeader);
