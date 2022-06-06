import { html, TemplateResult } from 'lit';
import '../index.js';

export default {
  title: 'Select Rich',
  component: 'bcg-select-rich',
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
  html` <bcg-select-rich> </bcg-select-rich> `;

export const Default = Template.bind({});
