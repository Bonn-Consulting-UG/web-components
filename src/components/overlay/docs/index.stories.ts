import { html } from '@lion/core';
import { ArgTypes, Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Components/Overlay',
  component: 'bcg-overlay',
  argTypes: {
    content: {
      options: [],
    },
  },
};

const Template: Story<ArgTypes> = () =>
  html`
    <div
      style="width: 400px; height: 600px; position: absolute; top: 0; left: 0"
    >
      <bcg-overlay>
        <h3 style="text-align: center; margin-top: 0">Overlay</h3>
      </bcg-overlay>
    </div>
  `;

export const Default = Template.bind({});
