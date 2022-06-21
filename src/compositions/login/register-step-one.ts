import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgRegisterStepOne extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  nextStep: any;

  static get properties() {
    return {
      nextStep: { type: Function },
    };
  }

  constructor() {
    super();
    this.nextStep = () => 'test';
  }

  render() {
    return html`
      <div>
        <h2>Registrieren über:</h2>
        <bcg-button label="Facebook"></bcg-button>
        <bcg-button label="Twitter"></bcg-button>
        <bcg-button label="Gmail"></bcg-button>
      </div>
      <div>
        <bcg-input label="Name"></bcg-input>
        <bcg-input-email label="E-Mail"></bcg-input-email>
        <bcg-input label="Password"></bcg-input>
        <bcg-checkbox-group label=""></bcg-checkbox-group>
      </div>
    `;
  }
}
