import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';

export class BcgPasswordResetFinished extends ScopedElementsMixin(LitElement) {
  @property({ type: Function }) changeContext: any = () =>
    console.log('back default');

  static get properties() {
    return {
      nextStep: { type: Function },
      user: { type: Object },
    };
  }

  static get styles() {
    return [css``];
  }

  render() {
    return html`
      <div>
        <h2>
          Ihr Password wurde erfolgreich geändert. <br />
          Sie können Sich jetzt mit Ihrem neuen Password anmelden.
        </h2>
      </div>
      <bcg-button-submit @click="${this.changeContext}"
        >Anmelden</bcg-button-submit
      >
    `;
  }
}
