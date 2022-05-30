import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionCollapsible } from '@lion/collapsible';

export class BcgCollapsible extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-collapsible': LionCollapsible };
  }

  render() {
    return html`
      <lion-collapsible opened>
        <button slot="invoker">More about cars</button>
        <div slot="content">
          Most definitions of cars say that they run primarily on roads, seat
          one to eight people, have four tires, and mainly transport people
          rather than goods.
        </div>
      </lion-collapsible>
    `;
  }
}
