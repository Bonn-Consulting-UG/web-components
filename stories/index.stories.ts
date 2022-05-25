import { html, TemplateResult } from 'lit';
import '../src/tabs/index.js';

export default {
  title: 'Tabs',
  component: 'bcg-tabs',
  argTypes: {
  },
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

const Template: Story<ArgTypes> = () => html`
  <bcg-tabs></bcg-tabs>
`;

export const Tabs = Template.bind({});

