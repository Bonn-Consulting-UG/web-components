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

  render() {
    return html`<div style="display:flex;">
        <div style="display:flex; flex-diretion:row;margin-right:10px;padding:10px;">
          <lion-icon icon-id="bcg:comments:thumbsup"></lion-icon>
          <span style="margin-left:10px;">0 </span>
        </div>
        <div style="display:flex; flex-diretion:row;margin-right:10px;padding:10px;">
          <lion-icon icon-id="bcg:comments:thumbsdown"></lion-icon>
          <span style="margin-left:10px;">0 </span>
        </div>
        <div style="display:flex; flex-diretion:row;margin-right:10px;padding:10px;">
          <lion-icon icon-id="bcg:comments:message"></lion-icon>
          <span style="margin-left:10px;">Antworten </span>
        </div>     
        <div style="display:flex; flex-diretion:row;margin-right:10px;padding:10px;">
          <lion-icon icon-id="bcg:comments:report"></lion-icon>
          <span style="margin-left:10px;">Melden </span>
        </div>
        </div>
      </div>
    </div>`;
  }
}
