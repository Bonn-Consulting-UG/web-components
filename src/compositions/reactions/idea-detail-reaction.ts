import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module';
import { addReaction } from '../../utils/services/comments';
import {  getAllModulesEndpoint, getModuleEndpoint } from '../../utils/services/config';
import { getModule } from '../../utils/services/module';


export class BcgIdeaReaction extends ScopedElementsMixin(BcgModule) {
 
   async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this.fetchData();
  }

  async fetchData () :  Promise<void> {
    this.count = await getModule(this.moduleId)
    this.requestUpdate();
  }

  count:any='';

  reactionConfig = []


  static get styles() {
    return [
      css`
        :host .comment-response {
          background-color: white;
          margin-left: 100px;
          border: 1px grey solid;
        }
        :host .moderator {
          border-left: 5px solid green;
        }
        :host .moderator-name {
          color: green;
        }

        :host .comment-poster {
          display: flex;
          flex-direction: row;
        }
        :host .comment-wrapper {
          display: flex;
          flex-direction: column;
        }
        :host .comment-details {
          display: flex;
          flex-direction: column;
        }
        :host .comment-image {
          display: flex;
          align-self: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          margin-right: 15px;
        }
      `
    ];
  }

  render() {
    return  html`<bcg-reaction .reactions=${[{
      value: this.count._count.likes,
      icon: 'bcg:comments:thumbsup',
      clickHandler:async () => {await addReaction({type:"LIKE"},'',this.moduleId),  this.fetchData()}
    },{
      value:this.count._count.dislikes,
      icon: 'bcg:comments:thumbsdown',
      clickHandler:async() => {await addReaction({type:"DISLIKE"},'',this.moduleId),this.fetchData()}
    }]}></bcg-reaction> `;
  }
}

