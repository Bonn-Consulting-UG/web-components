/* eslint-disable import/extensions */
import { BcgMapLayer } from './map-layer';

import { componentNames } from '../../utils/config';

customElements.define(
  componentNames.compositions.mapLayer,
  BcgMapLayer
);
