/* eslint-disable import/extensions */
import { BcgRadio } from './radio';
import { BcgRadioGroup } from './radio-group';
import { componentNames } from '../../utils/config';

customElements.define(componentNames.radiogroup, BcgRadioGroup);
customElements.define(componentNames.radio, BcgRadio);
