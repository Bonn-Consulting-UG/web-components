import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionAccordion } from '@lion/accordion';

export class BcgComments extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-accordion': LionAccordion };
  }

  render() {
    return html`
      <lion-accordion>
        <h3 slot="invoker">
          <button>Nutritional value</button>
        </h3>
        <p slot="content">
          Orange flesh is 87% water, 12% carbohydrates, 1% protein, and contains
          negligible fat (table). In a 100 gram reference amount, orange flesh
          provides 47 calories, and is a rich source of vitamin C, providing 64%
          of the Daily Value. No other micronutrients are present in significant
          amounts (table).
        </p>
        <h3 slot="invoker">
          <button>Nutritional value</button>
        </h3>
        <p slot="content">
          Orange flesh is 87% water, 12% carbohydrates, 1% protein, and contains
          negligible fat (table). In a 100 gram reference amount, orange flesh
          provides 47 calories, and is a rich source of vitamin C, providing 64%
          of the Daily Value. No other micronutrients are present in significant
          amounts (table).
        </p>
      </lion-accordion>
    `;
  }
}
