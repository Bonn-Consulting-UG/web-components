import { LionTabs } from '@lion/tabs';
import { html,css, ScopedElementsMixin } from '@lion/core';

export class BcgTabs extends ScopedElementsMixin(LionTabs) {
    static get styles() {
      return [
        ...super.styles,
        css`

        `,
      ];
    }

    static get scopedElements() {
      return { 'lion-tabs': LionTabs };
    }
    

    render(){
      return html`
        <lion-tabs>
          <button slot="tab">Button 1</button>
          <p slot="panel">Text 1</p>
          <button slot="tab">Button 2</button>
          <p slot="panel">Text 2</p>
        </lion-tabs>`;
     }
  }


