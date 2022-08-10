import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgRegisterStepThree extends ScopedElementsMixin(LitElement) {
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

  static get styles() {
    return [css``];
  }

  render() {
    return html`<div>
        <h2>
          Sie haben einen Bestätigungscode per E-Mail erhalten. Bitte geben Sie
          den Code ein:
        </h2>

        <bcg-input
          label=""
          placeholder="Geben Sie den 4-stelligen Code ein"
        ></bcg-input>
      </div>
      <div>
        <h3>Sie haben keine E-Mail erhalten?</h3>
        <ul>
        <li>Neuen Code senden</li>
        <li>E-Mail Adresse überarbeiten</li> 
      </div>

      <bcg-button @click="${() =>
        this.nextStep()}" >Code abschicken</bcg-button> 
`;
  }
}
