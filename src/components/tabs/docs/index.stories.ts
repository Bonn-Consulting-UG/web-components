import { html } from '@lion/core';
import '../index.js';
import '../../tab-panel/index.js';
import '../../tab-button/index.js';
import { Story } from '../../../model/story-interfaces.js';

export default {
  title: 'Components/Tabs',
  argTypes: {
    content: {
      options: [],
    },
  },
};

interface ArgTypes {
  content: any;
}

const Template: Story<ArgTypes> = () => html`<bcg-tabs> </bcg-tabs> `;

export const Default = Template.bind({});
