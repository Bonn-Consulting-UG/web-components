import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/InputIban',
  component: 'bcg-input-iban',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () =>
  html` <bcg-input-iban></bcg-input-iban> `;

export const Default = Template.bind({});
