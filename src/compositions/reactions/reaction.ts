import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionIcon } from '@lion/icon';
import { BcgModule } from '../../components/module';

export interface ReactionInterface {
  icons: Array<String>;
}

export class BcgReaction extends ScopedElementsMixin(BcgModule) {
  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  variant: string = 'large';



reactions:any = []

  static get properties() {
    return {
      ...super.properties,
      variant: { type: Object },
      reactions:{type:Object}
    };
  }

  render() {
    return html`
    <div style="display:flex;">
    ${this.reactions.map((item:any)=> html`<div @click=${()=> item.clickHandler()} style="display:flex;flex-diretion:row;margin-right:10px;padding:10px;">   
          <lion-icon icon-id="${item.icon}"></lion-icon>
          <span style="margin-left:10px;">${item.value} </span>
        </div>`)}

    </div>`;
  }
}
