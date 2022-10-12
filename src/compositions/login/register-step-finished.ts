import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgRegisterStepFinished extends ScopedElementsMixin(LitElement) {
  nextStep: any;

  user: any;

  static get properties() {
    return {
      nextStep: { type: Function },
      user: { type: Object },
    };
  }

  constructor() {
    super();
    this.nextStep = () => 'test';
    this.user = {};
  }

  static get styles() {
    return [css``];
  }

  render() {
    console.log(this.user);
    return html`
      <div>
        <h2>Willkommen, ${this.user.firstname} ${this.user.lastname}!</h2>
        <h2>Ihre Registrierung war erfolgreich.</h2>
      </div>
      <bcg-button-submit @click="${() => this.nextStep()}"
        >Jetzt beteiligen</bcg-button-submit
      >
    `;
  }
}
