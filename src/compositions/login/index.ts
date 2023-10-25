/* eslint-disable import/extensions */
import { BcgLogin } from './login';
import { BcgEditProfile } from './edit-profile';
import { BcgUserMenu } from './user-menu';

import { BcgRegister } from './register';

import { componentNames } from '../../utils/config';
import { BcgUserVerify } from './user-verify';
import { BcgPasswordReset } from './password-reset';

customElements.define(componentNames.compositions.login, BcgLogin);
customElements.define(componentNames.compositions.register, BcgRegister);
customElements.define(componentNames.compositions.editUser, BcgEditProfile);
customElements.define(componentNames.compositions.userMenu, BcgUserMenu);
customElements.define(componentNames.compositions.verify, BcgUserVerify);
customElements.define(componentNames.compositions.reset, BcgPasswordReset);
