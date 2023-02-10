import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/InputStepper',
  component: 'bcg-input-stepper',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () =>
  html` <bcg-input-stepper></bcg-input-stepper> `;

export const Default = Template.bind({});
