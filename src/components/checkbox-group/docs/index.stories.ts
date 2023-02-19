import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/CheckboxGroup',
  component: 'bcg-checkbox-group',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () =>
  html`
    <bcg-checkbox-group>
      <bcg-checkbox
        label="Ich akzeptiere die 
        Datenschutzerklärung"
        .choiceValue=${'Ich akzeptiere die Datenschutzerklärung'}
      ></bcg-checkbox>
    </bcg-checkbox-group>
  `;

export const Default = Template.bind({});
