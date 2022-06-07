import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { LionButton } from '@lion/button';

export class BcgButtonDecorator extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  @property({ type: String })
  label: string = 'Default Label';

  static get scopedElements() {
    return { 'lion-button': LionButton };
  }

  render() {
    console.log(this.label);
    return html` <lion-button> ${this.label} </lion-button>`;
  }
}
