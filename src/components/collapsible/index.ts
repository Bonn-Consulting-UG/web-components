/* eslint-disable import/extensions */
import { BcgCollapsible } from './collapsible';
import { BcgCollapsibleButton } from './collapsible-button';
import { componentNames } from '../../utils/config';

customElements.define(componentNames.collapsible, BcgCollapsible);
customElements.define(componentNames.collapsiblebutton, BcgCollapsibleButton);
