/* eslint-disable import/extensions */
import { BcgButton } from './button';
import { BcgButtonReset } from './button-reset';
import { BcgButtonSubmit } from './button-submit';

import { componentNames } from '../../utils/config';

customElements.define(componentNames.buttonreset, BcgButtonReset);
customElements.define(componentNames.buttonsubmit, BcgButtonSubmit);
