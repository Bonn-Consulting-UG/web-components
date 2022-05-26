import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionAccordion } from '@lion/accordion';

export class BcgAccordion extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-accordion': LionAccordion };
  }

  render() {
    return html`
      <lion-accordion>
        <h3 slot="invoker">
          <button>Sensory Factors</button>
        </h3>
        <div slot="content">
          <p>
            The taste of oranges is determined mainly by the relative ratios of sugars and acids,
            whereas orange aroma derives from volatile organic compounds, including alcohols,
            aldehydes, ketones, terpenes, and esters. Bitter limonoid compounds, such as limonin,
            decrease gradually during development, whereas volatile aroma compounds tend to peak in
            mid– to late–season development. Taste quality tends to improve later in harvests when
            there is a higher sugar/acid ratio with less bitterness. As a citrus fruit, the orange
            is acidic, with pH levels ranging from 2.9 to 4.0.
          </p>
          <p>
            Sensory qualities vary according to genetic background, environmental conditions during
            development, ripeness at harvest, postharvest conditions, and storage duration.
          </p>
        </div>

      </lion-accordion>
    `;
  }
}
