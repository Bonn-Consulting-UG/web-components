import { html, TemplateResult } from 'lit';
import './index.js';

export default {
  title: 'Switch',
  component: 'bcg-switch',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  counter?: number;
  textColor?: string;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = () => html` <bcg-switch></bcg-switch> `;

export const Tabs = Template.bind({});
