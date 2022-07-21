/* eslint-disable import/extensions */
import { BcgFaqSubmission } from './faq-submission';

import { componentNames } from '../../utils/config';

window.customElements.define(
  componentNames.compositions.faqSubmission,
  BcgFaqSubmission
);
