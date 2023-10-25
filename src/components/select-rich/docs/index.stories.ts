import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Components/Select Rich',
  component: 'bcg-select-rich',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () =>
  html` <bcg-select-rich> </bcg-select-rich> `;

export const Default = Template.bind({});
