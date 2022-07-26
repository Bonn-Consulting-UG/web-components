/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgButton } from '../../components/button/button';
import { BcgInput } from '../../components/input/input';
import { BcgCheckboxGroup } from '../../components/checkbox-group/checkbox-group';
import { BcgSelect } from '../../components/select/select';

export class BcgInputMaskStepOne extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  nextStep: any;

  constructor() {
    super();
    this.nextStep = () => console.log('test');
  }

  static get properties() {
    return {
      nextStep: { type: Function }
    };
  }

  static get scopedElements() {
    return {
      'bcg-input': BcgInput,
      'bcg-button': BcgButton,
      'bcg-checkbox-group': BcgCheckboxGroup,
      'bcg-select': BcgSelect
    };
  }

  render() {
    return html`
      <div>
        <bcg-input
          label="1.Welche Art von Beteiligung  soll angeboten werden?*"
          placeholder=""
        ></bcg-input>
        <p>2. Wann sollen die Beiträge der User veröffentlicht werden?*</p>
        <bcg-select placeholder="">
          <select slot="input">
            <option selected hidden value>placeholder</option>
            <option value="Registrierung nötig ">Registrierung nötig</option>
            <option value="keine Registrierung nötig (anonym)">
              keine Registrierung nötig (anonym)
            </option>
            <option
              value="persönliche Einladung nötig (geschlossene Beteiligung)"
            >
              persönliche Einladung nötig (geschlossene Beteiligung)
            </option>
          </select>
        </bcg-select>
        <div>
          <bcg-input-datepicker label="von" type="text"></bcg-input-datepicker>
          <bcg-input-datepicker type="text" label="bis"></bcg-input-datepicker>
        </div>
        <p>4. Welche Beteiligungsphasen gibt es?</p>
        <bcg-input label="Phase 1" placeholder=""></bcg-input>
        <bcg-textarea label="Beschreibung" rows="6"></bcg-textarea>

        <div>
          <p>Wann findet diese Phase statt?</p>
          <bcg-input-datepicker label="von" type="text"></bcg-input-datepicker>
          <bcg-input-datepicker type="text" label="bis"></bcg-input-datepicker>
        </div>
      </div>
      <div>
        <bcg-button label="Abbrechen"> ></bcg-button>
        <bcg-button
          @click="${() => this.nextStep()}"
          label="Weiter"
        ></bcg-button>
      </div>
    `;
  }
}
