/* eslint-disable import/extensions */
import { BcgCalendar } from './calendar';
import { componentNames } from '../../utils/config';

window.customElements.define(componentNames.calendar, BcgCalendar);
