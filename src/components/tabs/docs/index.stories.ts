import { html } from '@lion/core';
import '../index';
import '../../tab-panel/index';
import '../../tab-button/index';
import { Story } from '../../../model/story-interfaces';

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
