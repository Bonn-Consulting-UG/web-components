import { html, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module';

export class BcgContactSubmission extends ScopedElementsMixin(BcgModule) {
  render() {
    const { isLoggedIn } = this;

    return html`
      <div>
        <h1 style="margin-right:50px;">So erreichen Sie uns</h1>

        <div style="display:flex; flex-direction:row;">
          <div style="display:flex; flex-direction:column; flex-basis:30%;">
            <h2>Per Post</h2>
            <div style="margin-bottom:20px;">
              <p>Name</p>
              <p>Zusatz</p>
              <p>Straße, Hausnummer</p>
              <p>PLZ Ort</p>
            </div>
            <p>Telefon:</p>
            <p>E-Mail:</p>
          </div>

          <div style="display:flex; flex-direction:column;flex-basis:70%;">
            <h2>Per Konatkformular</h2>

            ${isLoggedIn
              ? null
              : html`
                  <bcg-input label="Ihr Name " placeholder=""></bcg-input>

                  <bcg-input label="Ihre E-Mail " placeholder=""></bcg-input>
                `}
            <bcg-input label="Betreff" placeholder=""></bcg-input>

            <bcg-textarea
              rows="6"
              label="Nachricht"
              placeholder=""
            ></bcg-textarea>
            <div>
              <input type="checkbox" id="scales" name="scales" />
              <label for="scales"
                >Ich akzeptiere die Datenschutzerklärung</label
              >
            </div>
            <div>
              <bcg-button
                @click="${() => console.log('Frage einreichen Senden')}"
                >Senden</bcg-button
              >
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
