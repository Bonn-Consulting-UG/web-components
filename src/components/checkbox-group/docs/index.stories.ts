import { html, TemplateResult } from 'lit';
import '../index.js';

export default {
  title: 'CheckboxGroup',
  component: 'bcg-checkbox-group',
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
  html` <bcg-checkbox-group></bcg-checkbox-group> `;

export const Default = Template.bind({});
