/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgButton } from '../../components/button/button';
import { BcgCheckboxGroup } from '../../components/checkbox-group/checkbox-group';
import { BcgInput } from '../../components/input/input';
import registerData from '../../utils/data/composition/register.json' assert { type: 'json' };

export class BcgRegisterStepOne extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  nextStep: any;

  static get properties() {
    return {
      nextStep: { type: Function }
    };
  }

  constructor() {
    super();
    this.nextStep = () => 'test';
  }

  static get scopedElements() {
    return {
      'bcg-input': BcgInput,
      'bcg-button': BcgButton,
      'bcg-checkbox-group': BcgCheckboxGroup
    };
  }

  render() {
    return html`
      <div>
        <h2>${registerData.stepOne.headline}</h2>
        <div>
          <bcg-button @click="${() => this.nextStep()}">
            ${registerData.stepOne.buttonOne}
          </bcg-button>
          <bcg-button disabled @click="${() => this.nextStep()}">
            ${registerData.stepOne.buttonTwo}
          </bcg-button>
        </div>
      </div>
    `;
  }
}
