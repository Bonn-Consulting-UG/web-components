import { html, TemplateResult } from '@lion/core';
import '../index.js';
import '../../tab-panel/index.js';
import '../../tab-button/index.js';

export default {
  title: 'Tabs',
  argTypes: {
    content: {
      options: [],
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  content: any;
}

const Template: Story<ArgTypes> = () => html`<bcg-tabs> </bcg-tabs> `;

export const Default = Template.bind({});
