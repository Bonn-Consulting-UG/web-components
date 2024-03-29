import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Components/InputTel',
  component: 'bcg-input-tel',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () => html` <bcg-input-tel></bcg-input-tel> `;

export const Default = Template.bind({});
