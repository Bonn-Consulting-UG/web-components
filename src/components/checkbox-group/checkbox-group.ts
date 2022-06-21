import { LionCheckboxGroup, LionCheckbox } from '@lion/checkbox-group';
import { html, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgCheckboxGroup extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'lion-checkbox-group': LionCheckboxGroup,
      'lion-checkbox': LionCheckbox,
    };
  }

  render() {
    return html` <lion-checkbox-group name="scientists[]" label="">
      <lion-checkbox
        label="Ich akzeptiere die Netiquette und die 
        Datenschutzerklärung"
        .choiceValue=${'Ich akzeptiere die Netiquette und die Datenschutzerklärung'}
      ></lion-checkbox>
    </lion-checkbox-group>`;
  }
}
