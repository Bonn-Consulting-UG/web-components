import { LionTabs } from '@lion/tabs';
import { css } from '@lion/core';

export class BcgTabs extends LionTabs {
  static get styles() {
    return [css``];
  }

  items: any;

  connectedCallback() {
    super.connectedCallback();
    this._setupFeature();
  }

  _setupFeature() {
    console.log('init', this);
    this.items = JSON.parse(this.getAttribute('data-content')!);
    console.log('items ?', this.items);
  }
}
