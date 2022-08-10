import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgRegisterStepFinished extends ScopedElementsMixin(LitElement) {
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
    return html`
      <div>
        <h2>Willkommen, [Name]!</h2>
        <h2>Ihre Registrierung war erfolgreich.</h2>
      </div>
      <bcg-button @click="${() => this.nextStep()}"
        >Jetzt beteiligen</bcg-button
      >
    `;
  }
}
