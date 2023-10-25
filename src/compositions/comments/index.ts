/* eslint-disable import/extensions */
import { BcgComments } from './comments';
import '../index';

import { componentNames } from '../../utils/config';

customElements.define(componentNames.compositions.comments, BcgComments);
