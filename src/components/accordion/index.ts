/* eslint-disable import/extensions */
import { BcgAccordion } from './accordion';
import { BcgAccordionButton } from './accordion-button';
import { componentNames } from '../../utils/config';

customElements.define(componentNames.accordion, BcgAccordion);
customElements.define('bcg-accordion-button', BcgAccordionButton);
