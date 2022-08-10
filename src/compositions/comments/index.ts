/* eslint-disable import/extensions */
import { BcgComments } from './comments';
import { BcgComment } from './comment';

import { componentNames } from '../../utils/config';

customElements.define(componentNames.compositions.comments, BcgComments);
customElements.define(componentNames.comment, BcgComment);
