import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgInputMaskStepFinished extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  render() {
    return html`
      <div>
        <h2>Willkommen, [Name]!</h2>
        <h2>Ihre Registrierung war erfolgreich.</h2>
      </div>
    `;
  }
}
