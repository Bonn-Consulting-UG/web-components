import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { de } from 'date-fns/locale';
import { format } from 'date-fns';

import {
  addReaction,
  approveComment,
  censorComment,
  removeReaction,
  reportComment,
} from '../../utils/services/comments';
import { BcgModule } from '../../components/module/module';

export class BcgModeratorMenu extends LitElement {
  @property({ type: Boolean }) isOpen: boolean = false;

  @property({ type: Function }) changeDialog: any;

  @property({ type: String }) commentStatus: any;

  @property({ type: String }) commentId: any;

  @property({ type: Boolean }) isFocused: any;

  @property({ type: String }) options: any = [
    {
      label: 'Speeren',
      onClickHandler: () =>
        this.changeDialog(
          'Verstößt dieser Kommentar aus Ihrer Sicht wirklich gegen unsere Netiquette?',
          () => censorComment(this.commentId)
        ),
      icon: '',
    },
    {
      label: 'Freigeben',
      onClickHandler: () =>
        this.changeDialog('Wollen das Kommentar wirklich freigeben?', () =>
          approveComment(this.commentId)
        ),
      icon: '',
    },
  ];

  static get styles() {
    return [
      css`
        .menu-entry-buttn {
          z-index: 99;
        }
        .dots-icon > svg {
          fill: rgb(2, 142, 134);
        }
      `,
    ];
  }

  updated(changedProperties: any): void {
    this?.shadowRoot
      ?.querySelector(`#wrapper`)
      ?.addEventListener('mouseleave', () => {
        this.isOpen = false;
      });

    super.updated(changedProperties);
  }

  render() {
    return html`
      <div
        id="wrapper"
        style="position:absolute;display:flex;flex-direction:column;right:20px;align-self:flex-end;z-index:99;"
      >
        <bcg-button
          style="align-self: flex-end;"
          @click=${() => (this.isOpen = !this.isOpen)}
          ><lion-icon class="dots-icon" icon-id="bcg:comments:dots"></lion-icon
        ></bcg-button>
        ${this.isOpen
          ? this.options.map(
              (e: any) =>
                html`<bcg-button
                  class="menu-entry-buttn"
                  @click=${e.onClickHandler}
                  >${e.label}</bcg-button
                >`
            )
          : null}
      </div>
    `;
  }
}
