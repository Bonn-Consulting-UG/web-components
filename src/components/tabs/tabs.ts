import { LionTabs } from '@lion/tabs';
import { css, html, ScopedElementsMixin, LitElement } from '@lion/core';
import { BcgTabPanel } from '../tab-panel/tab-panel';
import { BcgTabButton } from '../tab-button/tab-button';

export class BcgTabs extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupFeature();
  }

  _setupFeature() {}

  static get scopedElements() {
    return {
      'lion-tabs': LionTabs,
      'bcg-tab-button': BcgTabButton,
      'bcg-tab-panel': BcgTabPanel,
    };
  }

  render() {
    return html` <lion-tabs>
      <bcg-tab-button slot="tab">Tab 1</bcg-tab-button>
      <bcg-tab-panel slot="panel">Panel 1</bcg-tab-panel>
      <bcg-tab-button slot="tab">Tab 2</bcg-tab-button>
      <bcg-tab-panel slot="panel">Panel 2</bcg-tab-panel></lion-tabs
    >`;
  }
}
