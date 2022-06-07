import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Button',
  component: 'bcg-button',
  argTypes: {
    label: {},
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label: string;
}

const Template: Story<ArgTypes> = args =>
  html` <bcg-button .label="${args.label}"></bcg-button> `;

const Default = Template.bind({});

Default.args = {
  label: 'Test',
};

export { Default };
