/* eslint-disable import/extensions */
import { BcgButton } from './button';
import { BcgButtonReset } from './button-reset';
import { BcgButtonSubmit } from './button-submit';

import { componentNames } from '../../utils/config';

window.customElements.define(componentNames.button, BcgButton);
window.customElements.define(componentNames.buttonreset, BcgButtonReset);
window.customElements.define(componentNames.buttonsubmit, BcgButtonSubmit);
