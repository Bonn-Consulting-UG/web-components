import { html, TemplateResult } from 'lit';
import '../index.js';

export default {
  title: 'Components/InputTelDropdown',
  component: 'bcg-input-tel-dropdown',
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
  html` <bcg-input-tel-dropdown></bcg-input-tel-dropdown> `;

export const Default = Template.bind({});
