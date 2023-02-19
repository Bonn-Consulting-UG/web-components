import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/InputDatepicker',
  component: 'bcg-input-datepicker',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () =>
  html` <bcg-input-datepicker></bcg-input-datepicker> `;

export const Default = Template.bind({});
