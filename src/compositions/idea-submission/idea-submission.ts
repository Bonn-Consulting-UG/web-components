import { html, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgIdeaSubmission extends ScopedElementsMixin(LitElement) {
  isLoggedIn: Boolean;

  static get properties() {
    return {
      isLoggedIn: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.isLoggedIn = false;
  }

  render() {
    const { isLoggedIn } = this;

    return html`
      <div>
        <div style="display:flex; flex-direction:column;">
          <h1 style="flex-grow: 1;">Idee einreichen</h1>
          <p style="width:650px;">
            Hier steht Text, den das Projektteam geschrieben hat und der
            erklärt, warum es sinnvoll und wichtig ist, eine Idee für das
            projekt zu hinterlassen. Lorem ipsum dolor sit amet. Est eligendi
            accusantium est cumque excepturi sit necessitatibus consequatur non
            minus sunt et nobis quia et veniam eligendi. Ea rerum voluptas non
            nulla alias aut expedita assumenda sit dolor conse.
          </p>
          <p style="background-color:#56A1E8; width:500px">
            Alle mit * gekennzeichneten Felder sind Pflichtfelder.
          </p>

          <bcg-input label="Titel Ihrer Idee *" placeholder=""></bcg-input>
          <bcg-textarea
            rows="5"
            label="Erzählen Sie uns mehr von Ihrer Idee *"
            placeholder=""
          ></bcg-textarea>

          ${isLoggedIn
            ? null
            : html` <h1 style="flex-grow: 1;">Über Sie</h1>
                <p style="width:650px;">
                  Bitte geben Sie Ihren Namen ein. Dieser wird öffentlich
                  sichtbar in Verbindung mit Ihrer Idee erscheinen.
                </p>
                <bcg-input label="Ihr Name *" placeholder=""></bcg-input>
                <bcg-input label="Ihre E-Mail *" placeholder=""></bcg-input>
                <bcg-checkbox-group label=""></bcg-checkbox-group>`}
          <div>
            <bcg-button
              @click="${() => console.log('ButtonPress Vorschau')}"
              label="Vorschau"
            ></bcg-button>
            <bcg-button
              @click="${() => console.log('ButtonPress Senden')}"
              label="Senden"
            ></bcg-button>
          </div>
        </div>
      </div>
    `;
  }
}
