/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgButton } from '../../components/button/button';
import { BcgCheckboxGroup } from '../../components/checkbox-group/checkbox-group';
import { BcgInput } from '../../components/input/input';

export class BcgRegisterStepTwo extends ScopedElementsMixin(LitElement) {
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
        <h2>Registrieren über:</h2>
        <bcg-button label="Facebook"> ></bcg-button>
        <bcg-button label="Twitter"></bcg-button>
        <bcg-button label="Gmail"></bcg-button>
      </div>
      <div>
        <bcg-input label="Name" placeholder=""></bcg-input>
        <bcg-input-email label="E-Mail" placeholder=""></bcg-input-email>
        <bcg-input label="Password" placeholder=""></bcg-input>
        <bcg-checkbox-group label=""></bcg-checkbox-group>
      </div>
    `;
  }
}
