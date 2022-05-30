/* eslint-disable import/extensions */
import { BcgButton } from './button';
import { BcgButtonReset } from './button-reset';
import { BcgButtonSubmit } from './button-submit';

import { tagPrefix } from '../../config';

window.customElements.define(`${tagPrefix}-button`, BcgButton);
window.customElements.define(`${tagPrefix}-button-reset`, BcgButtonReset);
window.customElements.define(`${tagPrefix}-button-submit`, BcgButtonSubmit);
