import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module';

export class BcgRegisterStepFinished extends ScopedElementsMixin(BcgModule) {
  nextStep: any;

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
    return html`
      <div>
        <h2>Willkommen, ${this.user.given_name} ${this.user.family_name}!</h2>
        <h2>Ihre Registrierung war erfolgreich.</h2>
      </div>
      <bcg-button-submit @click="${() => this.nextStep()}"
        >Jetzt beteiligen</bcg-button-submit
      >
    `;
  }
}
