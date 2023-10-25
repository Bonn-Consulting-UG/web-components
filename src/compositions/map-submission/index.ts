/* eslint-disable import/extensions */
import { BcgMapSubmission } from './map-submission';
import '../index';

import { componentNames } from '../../utils/config';

customElements.define(
  componentNames.compositions.mapSubmission,
  BcgMapSubmission
);
