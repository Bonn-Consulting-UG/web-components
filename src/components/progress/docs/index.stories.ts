import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/Progress',
  component: 'bcg-progress',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () => html` <bcg-progress> </bcg-progress> `;

export const Default = Template.bind({});
