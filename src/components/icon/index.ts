/* eslint-disable import/extensions */
import { BcgIcon } from './icon';
import { componentNames } from '../../utils/config';
import './iconresolver';

window.customElements.define(componentNames.icon, BcgIcon);

export { BcgIcon };
