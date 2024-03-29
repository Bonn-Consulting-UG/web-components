import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Components/Textarea',
  component: 'bcg-textarea',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () => html` <bcg-textarea> </bcg-textarea> `;

export const Default = Template.bind({});
