import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/Dialog',
  component: 'bcg-dialog',
  argTypes: {
    content: {
      options: []
    }
  }
};

interface ContentArgs {
  button: string;
}

interface ArgTypes {
  content: Array<ContentArgs>;
}

const placementModeLocalConfig = {
  placementMode: 'local',
  elementToFocusAfterHide: document.body,
  hidesOnEsc: true
};

const Template: Story<ArgTypes> = () => html`
  <bcg-dialog .config=${placementModeLocalConfig}>
    <button slot="invoker">Open</button>
    <bcg-dialog-frame has-close-button slot="content"></bcg-dialog-frame>
  </bcg-dialog>
`;

export const Default = Template.bind({});
