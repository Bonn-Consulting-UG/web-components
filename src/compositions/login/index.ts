/* eslint-disable import/extensions */
import { BcgLogin } from './login';
import { BcgLogout } from './logout';
import { BcgEditProfile } from './edit-profile';

import { BcgRegister } from './register';

import { componentNames } from '../../utils/config';

customElements.define(componentNames.compositions.login, BcgLogin);
customElements.define(componentNames.compositions.logout, BcgLogout);
customElements.define(componentNames.compositions.register, BcgRegister);
customElements.define(componentNames.compositions.editUser, BcgEditProfile);
