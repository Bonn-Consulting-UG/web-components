import { LionCheckboxGroup, LionCheckbox } from '@lion/checkbox-group';
import { html, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgCheckboxGroup extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'lion-checkbox-group': LionCheckboxGroup,
      'lion-checkbox': LionCheckbox
    };
  }

  label: string;

  static get properties() {
    return {
      label: { type: String }
    };
  }

  constructor() {
    super();
    this.label = 'Default Label';
    console.log(this.label);
  }

  render() {
    return html` <lion-checkbox-group name="scientists[]" label="">
      <slot name="test"></slot>
    </lion-checkbox-group>`;
  }
}
