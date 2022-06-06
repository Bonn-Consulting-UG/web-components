import { html, TemplateResult } from 'lit';
import '../index.js';

export default {
  title: 'InputDate',
  component: 'bcg-input-date',
  argTypes: {
    content: {
      options: [],
    },
  },
};

interface ContentArgs {
  button: string;
  panel: string;
}

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  content: Array<ContentArgs>;
}

const Template: Story<ArgTypes> = () =>
  html` <bcg-input-date></bcg-input-date> `;

export const Default = Template.bind({});
