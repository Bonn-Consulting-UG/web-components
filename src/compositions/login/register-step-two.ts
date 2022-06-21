import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgRegisterStepTwo extends ScopedElementsMixin(LitElement) {
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
`;
  }
}
