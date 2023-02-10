import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/InputDate',
  component: 'bcg-input-date',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () =>
  html` <bcg-input-date></bcg-input-date> `;

export const Default = Template.bind({});
