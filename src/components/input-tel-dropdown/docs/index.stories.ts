import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/InputTelDropdown',
  component: 'bcg-input-tel-dropdown',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () =>
  html` <bcg-input-tel-dropdown></bcg-input-tel-dropdown> `;

export const Default = Template.bind({});
