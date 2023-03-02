import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module';

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
    return html`
      <div>
        <h2>
          Willkommen,
          ${this.user ? this.user.firstName : null}${' '}${this.user
            ? this.user.family_name
            : null}!
        </h2>
        <h2>Ihre Registrierung war erfolgreich.</h2>
        <bcg-login .disablePasswordReset=${true}></bcg-login>
      </div>
    `;
  }
}
