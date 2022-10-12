/* eslint-disable import/extensions */
import { BcgDialog } from './dialog';
import { componentNames } from '../../utils/config';
import { BcgDialogFrame } from './dialog-frame';

customElements.define(componentNames.dialog, BcgDialog);
customElements.define(componentNames.dialogFrame, BcgDialogFrame);
