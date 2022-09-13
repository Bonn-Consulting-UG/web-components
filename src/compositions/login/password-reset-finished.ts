import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgPasswordResetFinished extends ScopedElementsMixin(LitElement) {
  nextStep: any;

  static get properties() {
    return {
      nextStep: { type: Function },
      user: { type: Object }
    };
  }

  static get styles() {
    return [css``];
  }

  render() {
    return html`
      <div>
        <h2>
          Ihr Passwort wurde erfolgreich geändert. <br />
          Sie können Sich jetzt mit Ihrem neuen Passwort anmelden.
        </h2>
      </div>
      <bcg-button @click="${() => this.nextStep()}">Anmelden</bcg-button>
    `;
  }
}