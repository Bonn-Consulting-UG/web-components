import { html, TemplateResult } from 'lit';
import './index.js';
import '../tab-panel/index.js';
import '../tab-button/index.js';

export default {
  title: 'Tabs',
  component: 'bcg-tabs',
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

const Template: Story<ArgTypes> = () => html`
  <bcg-tabs>
    <bcg-tab-button slot="tab">Info</bcg-tab-button>
    <bcg-tab-panel slot="panel"
      >Info page with lots of information about us.</bcg-tab-panel
    >
    <bcg-tab-button slot="tab">Work</bcg-tab-button>
    <bcg-tab-panel slot="panel"
      >Work page that showcases our work.</bcg-tab-panel
    >
  </bcg-tabs>
`;

export const Tabs = Template.bind({});
