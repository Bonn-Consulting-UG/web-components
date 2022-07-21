/* eslint-disable import/extensions */
import { BcgLogin } from './login';
import { BcgLogout } from './logout';

import { BcgRegister } from './register';

import { componentNames } from '../../utils/config';

window.customElements.define(componentNames.compositions.login, BcgLogin);
window.customElements.define(componentNames.compositions.logout, BcgLogout);
window.customElements.define(componentNames.compositions.register, BcgRegister);
