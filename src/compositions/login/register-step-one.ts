/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgButton } from '../../components/button/button.js';
import { BcgCheckboxGroup } from '../../components/checkbox-group/checkbox-group';
import { BcgInput } from '../../components/input/input';

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
        <h2>Registrieren als:</h2>
        <div>
          <bcg-button variant='primary' @click="${() => this.nextStep()}">
            Als Privat Person
          </bcg-button>
          <bcg-button  variant='primary' disabled @click="${() => this.nextStep()}">
            Als Organisation
          </bcg-button>
        </div>
      </div>
    `;
  }
}
