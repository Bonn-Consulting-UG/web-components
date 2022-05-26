
import { html,css,  LitElement, ScopedElementsMixin } from '@lion/core';
import { LionButton } from '@lion/button';
 

export class BcgTabButton extends ScopedElementsMixin(LitElement) {
    static get styles() {
      return [
        css`
        `,
      ];
    }

    static get scopedElements() {
      return {
        'lion-button': LionButton,
      };
    }



    render(){
      return html`
        <lion-button><slot></slot></lion-button>`;
     }
  }


