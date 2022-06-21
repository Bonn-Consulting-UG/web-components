/* eslint-disable import/extensions */
import { BcgReaction } from './reaction';

import { componentNames } from '../../utils/config';

window.customElements.define(componentNames.compositions.reaction, BcgReaction);
