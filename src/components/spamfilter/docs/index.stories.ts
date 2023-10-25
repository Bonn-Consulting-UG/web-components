import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/Spamfilter',
  component: 'bcg-spamfilter',
  argTypes: {
    content: {
      options: []
    }
  }
};

const Template: Story<ArgTypes> = () =>
  html` <bcg-spamfilter></bcg-spamfilter> `;

export const Default = Template.bind({});
