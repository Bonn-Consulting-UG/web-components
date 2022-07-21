/* eslint-disable import/extensions */
import { BcgIdeaSubmission } from './idea-submission';

import { componentNames } from '../../utils/config';

window.customElements.define(
  componentNames.compositions.ideaSubmission,
  BcgIdeaSubmission
);
