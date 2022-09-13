import { css, html, LitElement } from '@lion/core';
import { Required } from '@lion/form-core';
import { SpamMatch } from '../../utils/validators/spamfilter';

export class BcgSpamFilter extends LitElement {
  selection: any;

  data: any = [
    { name: 'Finger Hoch', icon: 'bcg:comments:thumbsup' },
    { name: 'Finger Runter', icon: 'bcg:comments:thumbsdown' },
    { name: 'Nachrichten', icon: 'bcg:comments:message' }
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
      `
    ];
  }

  render() {
    Required.getMessage = async () => 'hello?ß';
    // console.log(this.currentSelected, this.randomIndex, this.selected);
    return html`<div>
      <div name="text">
        Bitte wählen sie das "<b>${this.currentSelected.name}</b>" Icon aus
      </div>
      <div name="selection">
        <bcg-checkbox-group
          name="spamfilter"
          .validators=${[new SpamMatch(this.currentSelected.name)]}
        >
          ${this.data.map(
            (el: any) => html`<bcg-checkbox
              @click=${(e: any) => {
                const checkboxes: any = [
                  ...e.target.parentElement.parentElement.querySelectorAll(
                    'input'
                  )
                ].filter((i: any) => i.checked === true);

                if (e.target !== checkboxes[0]) {
                  checkboxes.forEach((cb: any) => {
                    cb.checked = false;
                  });
                  e.target.checked = true;
                }
                if (checkboxes.length === 2) {
                  e.preventDefault();
                }
                // console.log(checkboxes.includes(e.target));
                // const checked = checkboxes.find((i: any) => i.checked === true);
                // if (checked.checked) checked.checked = !checked.checked;
              }}
              @model-value-changed=${(e: any) => {
                this.selected = e.target.value;
              }}
              .choiceValue=${el.name}
              ><slot slot="label" class="input-group">
                <bcg-icon .icon="${el.icon}"></bcg-icon></slot
            ></bcg-checkbox>`
          )}
        </bcg-checkbox-group>
      </div>
    </div>`;
  }
}
