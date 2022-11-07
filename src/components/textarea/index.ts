/* eslint-disable import/extensions */
import { BcgTextarea } from './textarea';
import { BcgTextareaWithCounter } from './textarea-counter';
import { componentNames } from '../../utils/config';

customElements.define(componentNames.textarea, BcgTextarea);
customElements.define(
  componentNames.textarea + `counter`,
  BcgTextareaWithCounter
);
