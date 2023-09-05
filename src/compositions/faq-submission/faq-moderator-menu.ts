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
  approveSubmission,
  censorComment,
  censorSubmission,
  removeReaction,
  reportComment,
} from '../../utils/services/comments';
import { BcgModule } from '../../components/module/module';

export class BcgFaqModeratorMenu extends LitElement {
  @property({ type: Boolean }) isOpen: boolean = false;

  @property({ type: Function }) changeDialog: any;

  @property({ type: String }) commentStatus: any;

  @property({ type: String }) submissionId: any;

  @property({ type: Boolean }) isFocused: any;

  @property({ type: String }) options: any = [
    {
      label: 'Speeren',
      onClickHandler: () =>
        this.changeDialog('Wollen Sie die Frage/Antwort wirklich speeren', () =>
          censorSubmission(this.submissionId)
        ),
      icon: '',
    },
    {
      label: 'Freigeben',
      onClickHandler: () =>
        this.changeDialog(
          'Wollen Sie die Frage/Antwort wirklich freigeben?',
          () => approveSubmission(this.submissionId)
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
        style="position:absolute;display:flex;flex-direction:column;right:20px;top:50px;align-self:flex-end;z-index:99;"
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
