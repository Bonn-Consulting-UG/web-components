import { html, TemplateResult } from 'lit';
import '../../../src/component/tabs/index.js';
import '../../../src/component/tab-panel/index.js';
import '../../../src/component/tab/index.js';



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
  <bcg-tabs>
    <bcg-tab slot="tab">Info</bcg-tab>
    <bcg-tab-panel slot="panel">Info page with lots of information about us.</bcg-tab-panel>
    <bcg-tab slot="tab">Work</bcg-tab>
    <bcg-tab-panel slot="panel">Work page that showcases our work.</bcg-tab-panel>
  </bcg-tabs>
`;

export const Tabs = Template.bind({});

