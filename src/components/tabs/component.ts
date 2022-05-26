import { LionTabs } from '@lion/tabs';
import { css } from '@lion/core';

export class BcgTabs extends LionTabs  {
    static get styles() {
      return [
        ...super.styles,
        css`
        `,
      ];
    }


    connectedCallback() {
      super.connectedCallback();
      this._setupFeature();
    }
  
    _setupFeature() {
      console.log("init", this)
    }
  }


