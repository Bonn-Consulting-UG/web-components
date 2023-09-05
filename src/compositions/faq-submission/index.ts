/* eslint-disable import/extensions */
import { BcgFaqSubmission } from './faq-submission';
import { BcgFaqView } from './faq-view';
import { BcgFaqModeratorMenu } from './faq-moderator-menu';

import { componentNames } from '../../utils/config';

customElements.define(
  componentNames.compositions.faqSubmission,
  BcgFaqSubmission
);

customElements.define(componentNames.compositions.faqView, BcgFaqView);
customElements.define('bcg-faq-moderator-menu', BcgFaqModeratorMenu);
