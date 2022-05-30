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
    return html` <lion-checkbox-group
      name="scientists[]"
      label="Favorite scientists"
    >
      <lion-checkbox
        label="Archimedes"
        .choiceValue=${'Archimedes'}
      ></lion-checkbox>
      <lion-checkbox
        label="Francis Bacon"
        .choiceValue=${'Francis Bacon'}
      ></lion-checkbox>
      <lion-checkbox
        label="Marie Curie"
        .choiceValue=${'Marie Curie'}
      ></lion-checkbox>
    </lion-checkbox-group>`;
  }
}
