/* eslint-disable import/extensions */
import { BcgIdeaSubmission } from './idea-submission';
import { BcgIdeaUserMenu } from './idea-user-menu';

import { componentNames } from '../../utils/config';

customElements.define(
  componentNames.compositions.ideaSubmission,
  BcgIdeaSubmission
);

customElements.define('bcg-idea-user-menu', BcgIdeaUserMenu);
