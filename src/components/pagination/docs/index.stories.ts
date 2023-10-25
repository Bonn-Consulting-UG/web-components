import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/Pagination',
  component: 'bcg-pagination',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () =>
  html` <bcg-pagination count="20" current="10"></bcg-pagination> `;

export const Default = Template.bind({});
