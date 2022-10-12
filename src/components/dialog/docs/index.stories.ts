import { html, TemplateResult } from '@lion/core';
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

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
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
