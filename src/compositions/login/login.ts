import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgLogin extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  render() {
    return html`
      <div style="display:flex;flex-direction:row-reverse;justify-content: left;">

      
      <div class="left-side" style="flex-direction:row-reverse; width:640px; ">
      <h1>Willkommen!</h1>
          <h2>Anmeldung</h2>
          <span>Schritt x von y </span>
          <div>
            <h2>Anmelden über:</h2>

            <bcg-button label="Facebook"></bcg-button>
            <bcg-button label="Twitter"></bcg-button>
            <bcg-button label="Gmail"></bcg-button>
          </div>
          <div>
            <bcg-input-email label="E-Mail"></bcg-input-email>
            <bcg-input label="Password"></bcg-input>
            <bcg-checkbox-group label="Password"></bcg-checkbox-group>
          </div>
          <bcg-button label="Registrieren"></bcg-button>
        </div>
        <div class="right-side">
        <img src="https://images.unsplash.com/photo-1654580038810-505030159ca0" style="width:629px;height:864px;" alt="123"></img>
        </div>
      </div>
    `;
  }
}
