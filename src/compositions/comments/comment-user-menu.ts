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
  deleteComment,
  removeReaction,
  reportComment,
} from '../../utils/services/comments.js';
import { BcgModule } from '../../components/module/module.js';
import { commentDelteEndPoint } from '../../utils/services/config.js';

export class BcgUserMenu extends BcgModule {
  @property({ type: Boolean }) isOpen: boolean = false;

  @property({ type: Function }) changeDialog: any;

  @property({ type: Function }) onEdit: any;

  @property({ type: Function }) authorId: any = null;

  @property({ type: String }) commentId: any;

  @property({ type: String }) canEdit: any;

  @property({ type: String }) commentStatus: any;

  @property({ type: String }) options: any = [
    {
      label: 'Bearbeiten',
      onClickHandler: () => this.onEdit(),
      condition: this.authorId === this.user.sub,
    },
    {
      label: 'Löschen',
      condition: this.authorId === this.user.sub,

      onClickHandler: () =>
        this.changeDialog(
          html`Soll Ihr Kommentar wirklich gelöscht werden? Hinweis: Mögliche
          Unterkommentare anderer Nutzer:innen bleiben erhalten.`,
          () => {
            deleteComment(this.commentId);

            if (this.canEdit) {
              this.onEdit();
            }
          }
        ),
    },
    {
      label: 'Melden',
      onClickHandler: () =>
        this.changeDialog(
          'Verstößt dieser Kommentar aus Ihrer Sicht wirklich gegen unsere Netiquette?',
          () => reportComment(this.commentId)
        ),
      condition: this.authorId !== this.user.sub,
    },
  ];

  updated(changedProperties: any): void {
    this?.shadowRoot
      ?.querySelector(`#wrapper`)
      ?.addEventListener('mouseleave', () => {
        console.log('leave');
        this.isOpen = false;
      });
    console.log(this.isOpen);
    super.updated(changedProperties);
  }

  static get styles() {
    return [css``];
  }

  render() {
    return html`
      <div
        id="wrapper"
        style="position:absolute;display:flex;flex-direction:column;right:60px;align-self:flex-end;z-index:99;"
      >
        <bcg-button
          style="align-self: flex-end;"
          @click=${() => (this.isOpen = !this.isOpen)}
          ><lion-icon icon-id="bcg:comments:dots"></lion-icon
        ></bcg-button>
        ${this.isOpen
          ? this.options.map((e: any) => {
              console.log(e.condition);
              return !e.condition
                ? html`<bcg-button @click=${e.onClickHandler}
                    >${e.label}</bcg-button
                  >`
                : null;
            })
          : null}
      </div>
    `;
  }
}
