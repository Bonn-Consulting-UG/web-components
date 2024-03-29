import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Components/Steps',
  component: 'bcg-steps',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () => html` <bcg-steps> </bcg-steps> `;

export const Default = Template.bind({});
