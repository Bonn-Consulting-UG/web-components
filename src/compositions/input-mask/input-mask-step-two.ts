import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgInputMaskStepTwo extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  render() {
    return html`
      <div>
        <bcg-input
          label="1. Zu welchen Themen sollen Ideen gesammelt werden?* "
          placeholder=""
        ></bcg-input>

        <div>
          <p>Beteiligungszeitraum</p>
          <bcg-input-datepicker label="von" type="text"></bcg-input-datepicker>
          <bcg-input-datepicker type="text" label="bis"></bcg-input-datepicker>
        </div>

        <p>2. Wann sollen die Beiträge der User veröffentlicht werden?*</p>
        <bcg-select>
          <select slot="input">
            <option selected hidden value>placeholder</option>
            <option value="Direkt nachdem der User sie abschickt">
              Direkt nachdem der User sie abschickt
            </option>
            <option value="Nachdem die Moderation sie freigibt">
              Nachdem die Moderation sie freigibt
            </option>
            <option
              value="Die Beiträge sollen gar nicht veröffentlicht werden."
            >
              Die Beiträge sollen gar nicht veröffentlicht werden.
            </option>
          </select>
        </bcg-select>

        <p>4. Welche Beteiligungsphasen gibt es?</p>
        <bcg-input label="Phase 1" placeholder=""></bcg-input>
        <bcg-textarea label="Beschreibung" rows="6"></bcg-textarea>

        <div>
          <p>Wann findet diese Phase statt?</p>
          <bcg-input-datepicker label="von" type="text"></bcg-input-datepicker>
          <bcg-input-datepicker type="text" label="bis"></bcg-input-datepicker>
        </div>

        <legend>
          3. Wie sollen eingereichte Ideen von anderen User bewertet werden
          können?* (Mehrfachauswahl möglich)
        </legend>

        <div>
          <input type="checkbox" id="scales" name="scales" checked />
          <label for="scales">gar nicht</label>
        </div>

        <div>
          <input type="checkbox" id="horns" name="horns" />
          <label for="horns">mit einem Daumen hoch</label>
        </div>

        <div>
          <input type="checkbox" id="horns" name="horns" />
          <label for="horns">mit einem Daumen runter</label>
        </div>
      </div>
      <div>
        <bcg-button>Zurück</bcg-button>
        <bcg-button>Abschicken</bcg-button>
      </div>
    `;
  }
}
