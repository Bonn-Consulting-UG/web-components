import { html, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgFaqSubmission extends ScopedElementsMixin(LitElement) {
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
        <div style="display:flex; flex-direction:row;">
          <h1 style="margin-right:50px;">Reichen Sie Ihre Frage ein!</h1>
          <div style="display:flex; flex-direction:column;">
            <p style="width:650px;">
              Unser FAQ konnte Ihre Frage nicht beantworten? Schreiben Sie uns!
              Erreicht uns eine Frage häufiger, veröffentlichen wir sie hier.
              Wir kontaktieren Sie mit einer Antwort, sofern uns Ihre
              E-Mail-Daten vorliegen.
            </p>

            <bcg-textarea
              rows="6"
              label="Ihre Frage *"
              placeholder=""
            ></bcg-textarea>

            <bcg-textarea
              rows="6"
              label="Erläuterungen"
              placeholder=""
            ></bcg-textarea>
            <p style="width:650px;">
              Sie können Ihre Frage hier erläutern, damit wir sie besser
              verstehen und einordnen können. Dies hilft uns, eine
              zufriedenstellende Antwort zu formulieren. Ihre Erläuterungen
              werden nicht veröffentlicht.
            </p>

            ${isLoggedIn
              ? null
              : html` <bcg-input label="Ihr Name " placeholder=""></bcg-input>
                  <p>Sofern Sie von uns kontaktiert werden möchten.</p>
                  <bcg-input label="Ihre E-Mail " placeholder=""></bcg-input>
                  <p>
                    Sofern Sie von uns mit einer Antwort direkt kontaktiert
                    werden möchten.
                  </p>
                  <div>
                    <input type="checkbox" id="scales" name="scales" />
                    <label for="scales"
                      >Ich akzeptiere die Netiquette und die
                      Datenschutzerklärung</label
                    >
                  </div>`}
            <div>
              <bcg-button
                @click="${() => console.log('Frage einreichen Senden')}"
                label="Frage einreichen"
              ></bcg-button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
