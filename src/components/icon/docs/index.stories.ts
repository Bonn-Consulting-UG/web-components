import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/Icon',
  component: 'bcg-icon',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () =>
  html` <bcg-icon .icon="bcg:comments:thumbsup"></bcg-icon> `;

export const Default = Template.bind({});
