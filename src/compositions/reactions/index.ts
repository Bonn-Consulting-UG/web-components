/* eslint-disable import/extensions */
import { BcgReaction } from './reaction';
import { BcgIdeaReaction } from './idea-detail-reaction';

import { componentNames } from '../../utils/config';

customElements.define(componentNames.reaction, BcgReaction);
customElements.define(componentNames.compositions.reaction.idea, BcgIdeaReaction);
