import { css, html, LitElement } from '@lion/core';
import { Required } from '../../utils/helpers/input-errors';
import { SpamMatch } from '../../utils/validators/spamfilter';

export class BcgSpamFilter extends LitElement {
  selection: any;

  rawdata: any = [
    { name: 'Becher', icon: 'bcg:spamfilter:cup' },
    { name: 'Auto', icon: 'bcg:spamfilter:car' },
    { name: 'Herz', icon: 'bcg:spamfilter:hearth' },
    { name: 'Schlüssel', icon: 'bcg:spamfilter:key' },
    { name: 'Flugzeug', icon: 'bcg:spamfilter:plane' },
    { name: 'Stern', icon: 'bcg:spamfilter:star' },
    { name: 'Baum', icon: 'bcg:spamfilter:tree' },
    { name: 'LKW', icon: 'bcg:spamfilter:truck' },
  ];

  data: any = [
    this.randomItem(this.rawdata),
    this.randomItem(this.rawdata),
    this.randomItem(this.rawdata),
  ];

  randomIndex = Math.floor(Math.random() * 3);

  randomItem(items: any) {
    return items[Math.floor(Math.random() * items.length)];
  }

  currentSelected = this.data[this.randomIndex];

  selected = '';

  static get styles() {
    return [
      css`
        .input-group {
          display: flex;
          flex-direction: row;
        }
      `,
    ];
  }

  render() {
    // console.log(this.currentSelected, this.randomIndex, this.selected);
    return html`<div style="">
      <div name="text">
        Bitte wählen Sie das "<b>${this.currentSelected.name}</b>" Icon aus
      </div>
      <div name="selection" style="display:flex;">
        <bcg-radio-group
          style="width:100%;border:1px solid var(--primary-color); padding:5px;"
          name="spamfilter"
          .validators=${[new SpamMatch(this.currentSelected.name)]}
        >
          ${this.data.map(
            (el: any) => html`<bcg-radio
              name=${el.name}
              .choiceValue=${el.name}
            >
              <slot slot="label" class="input-group">
                <bcg-icon .iconId="${el.icon}"></bcg-icon></slot
            ></bcg-radio>`
          )}
        </bcg-radio-group>
      </div>
    </div>`;
  }
}
