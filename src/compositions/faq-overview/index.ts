/* eslint-disable import/extensions */
import { BcgFaqOverview } from './faq-overview';

import { componentNames } from '../../utils/config';

window.customElements.define(
  componentNames.compositions.faqOverview,
  BcgFaqOverview
);
