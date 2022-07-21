/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgButton } from '../../components/button/button';
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
          <bcg-button
            style="margin-bottom:10px;"
            label="Als Privat Person"
            @click="${() => this.nextStep()}"
          >
          </bcg-button>
          <bcg-button
            label="Als Organisation"
            @click="${() => this.nextStep()}"
          >
          </bcg-button>
        </div>
      </div>
    `;
  }
}
