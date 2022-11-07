/* eslint-disable import/extensions */
import { BcgSwitch } from './switch';
import { componentNames } from '../../utils/config';
import { BcgSwitchButton } from './switch-button';

customElements.define(componentNames.switch, BcgSwitch as any);
customElements.define(componentNames.switch + '-button', BcgSwitchButton);
