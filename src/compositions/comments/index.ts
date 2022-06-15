/* eslint-disable import/extensions */
import { BcgComments } from './comments';
import { BcgComment } from './comment';

import { componentNames } from '../../utils/config';

window.customElements.define(componentNames.compositions.comments, BcgComments);
window.customElements.define(componentNames.comment, BcgComment);
