import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/ListBox',
  component: 'bcg-lis2tbox',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () => html` <bcg-listbox></bcg-listbox> `;

export const Default = Template.bind({});
