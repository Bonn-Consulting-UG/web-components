import { css, html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionRadioGroup, LionRadio } from '@lion/radio-group';

export class BcgRadio extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [
      css`

      }`
    ];
  }

  static get scopedElements() {
    return { 'lion-radio': LionRadio, 'lion-radio-group': LionRadioGroup };
  }

  render() {
    return html`
      <lion-radio-group name="dinos" label="What are your favourite dinosaurs?">
        <lion-radio
          label="allosaurus"
          .choiceValue=${'allosaurus'}
        ></lion-radio>
        <lion-radio
          label="brontosaurus"
          .choiceValue=${'brontosaurus'}
        ></lion-radio>
        <lion-radio
          label="diplodocus"
          .choiceValue=${'diplodocus'}
        ></lion-radio>
      </lion-radio-group>
    `;
  }
}
