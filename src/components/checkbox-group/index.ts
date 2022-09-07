/* eslint-disable import/extensions */
import { BcgCheckboxGroup } from './checkbox-group';
import { BcgCheckbox } from './checkbox';
import { componentNames } from '../../utils/config';

customElements.define(componentNames.checkboxgroup, BcgCheckboxGroup);
customElements.define(componentNames.checkbox, BcgCheckbox);
