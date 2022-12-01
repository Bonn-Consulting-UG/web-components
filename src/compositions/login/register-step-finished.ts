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
          Willkommen, ${this.user.firstName}${' '}${this.user.family_name}!
        </h2>
        <h2>Ihre Registrierung war erfolgreich.</h2>
      </div>
    `;
  }
}
