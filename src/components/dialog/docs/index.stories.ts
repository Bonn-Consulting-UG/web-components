import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Components/Dialog',
  component: 'bcg-dialog',
  argTypes: {
    content: {
      options: [],
    },
  },
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
  hidesOnEsc: true,
};

const Template: Story<ArgTypes> = () =>
  html` <bcg-dialog content="Dialog text?"> </bcg-dialog> `;

export const Default = Template.bind({});
