import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionButton } from '@lion/button';

export class BcgButton extends ScopedElementsMixin(LitElement) {
  label: string;

  static get styles() {
    return [css``];
  }

  static get properties() {
    return {
      label: { type: String },
    };
  }

  constructor() {
    super();
    this.label = 'Default Label';
    console.log(this.label);
  }

  static get scopedElements() {
    return { 'lion-button': LionButton };
  }

  render() {
    return html` <lion-button> ${this.label} </lion-button>`;
  }
}
