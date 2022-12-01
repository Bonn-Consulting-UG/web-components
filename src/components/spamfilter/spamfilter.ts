import { css, html, LitElement } from '@lion/core';
import { Required } from '../../utils/helpers/input-errors';
import { SpamMatch } from '../../utils/validators/spamfilter';

export class BcgSpamFilter extends LitElement {
  selection: any;

  data: any = [
    { name: 'Finger Hoch', icon: 'bcg:comments:thumbsup' },
    { name: 'Finger Runter', icon: 'bcg:comments:thumbsdown' },
    { name: 'Nachrichten', icon: 'bcg:comments:message' },
  ];

  randomIndex = Math.floor(Math.random() * 3);

  currentSelected = this.data[this.randomIndex];

  selected = '';

  static get styles() {
    return [
      css`
        :host > * .input-group {
          display: flex;
          flex-direction: row;
        }
      `,
    ];
  }

  render() {
    // console.log(this.currentSelected, this.randomIndex, this.selected);
    return html`<div>
      <div name="text">
        Bitte wählen sie das "<b>${this.currentSelected.name}</b>" Icon aus
      </div>
      <div name="selection">
        <bcg-radio-group
          name="spamfilter"
          .validators=${[new SpamMatch(this.currentSelected.name)]}
        >
          ${this.data.map(
            (el: any) => html`<bcg-radio>
              <slot slot="label" class="input-group">
                <bcg-icon .iconId="${el.icon}"></bcg-icon></slot
            ></bcg-radio>`
          )}
        </bcg-radio-group>
      </div>
    </div>`;
  }
}
