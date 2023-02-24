import {
  css,
  html,
  LitElement,
  property,
  ScopedElementsMixin,
} from '@lion/core';
import { Required } from '@lion/form-core';
import { SpamMatch } from '../../utils/validators/spamfilter';
import { BcgRadioGroup } from '../radio-group/radio-group';

interface IconData {
  name: string;
  icon: string;
}

export class BcgSpamFilter extends LitElement {
  @property({ type: String }) selected = '';
  selection: any;

  rawdata: IconData[] = [
    { name: 'Becher', icon: 'bcg:spamfilter:cup' },
    { name: 'Auto', icon: 'bcg:spamfilter:car' },
    { name: 'Herz', icon: 'bcg:spamfilter:hearth' },
    { name: 'Schlüssel', icon: 'bcg:spamfilter:key' },
    { name: 'Flugzeug', icon: 'bcg:spamfilter:plane' },
    { name: 'Stern', icon: 'bcg:spamfilter:star' },
    { name: 'Baum', icon: 'bcg:spamfilter:tree' },
    { name: 'LKW', icon: 'bcg:spamfilter:truck' },
  ];

  rawdataCopy: IconData[] = [...this.rawdata];

  data: IconData[] = [
    this.popRandomItem(this.rawdataCopy),
    this.popRandomItem(this.rawdataCopy),
    this.popRandomItem(this.rawdataCopy),
  ];

  createRenderRoot() {
    return this;
  }

  popRandomItem(items: any[]) {
    return items.splice(this.randomIndex(items.length), 1)[0];
  }

  randomIndex(limit: number): number {
    return Math.floor(Math.random() * limit);
  }

  currentSelected: IconData = this.data[this.randomIndex(this.data.length)];

  render() {
    return html` <div
        name="text"
        style="margin-bottom: 1em; text-align: center"
      >
        Bitte wählen Sie das "<b>${this.currentSelected.name}</b>" Icon aus
      </div>
      <div name="selection">
        <bcg-radio-group
          style="
          width: 20em;
          min-height: 4.5em;
          margin: auto;
          display: flex;
          justify-content: center;
          "
          name="spamfilter"
          @model-value-changed=${(ev: any) => {
            this.selected = ev.target.modelValue;
          }}
          .validators=${[
            new Required(),
            new SpamMatch(this.currentSelected.name),
          ]}
        >
          <div
            style="width: 10em; display: flex; justify-content: space-between; margin: auto; margin-bottom: 1em"
          >
            ${this.data.map(
              (el: any) => html` <bcg-radio
                name=${el.name}
                .choiceValue=${el.name}
                style="position: relative"
              >
                <label
                  slot="label"
                  style="position: absolute; height: 100%; top: 0; background: white; cursor: pointer"
                >
                  <bcg-icon
                    style="width: 2em; height: 2em; color:${this.selected ===
                    el.name
                      ? 'var(--alert-color-warning)'
                      : ''}"
                    icon-id="${el.icon}"
                  ></bcg-icon>
                </label>
              </bcg-radio>`
            )}
          </div>
        </bcg-radio-group>
      </div>`;
  }
}
