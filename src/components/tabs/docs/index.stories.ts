import { html, TemplateResult } from 'lit';
import '../index.js';
import '../../tab-panel/index.js';
import '../../tab-button/index.js';

export default {
  title: 'Tabs',
  component: 'bcg-tabs',
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

const Template: Story<ArgTypes> = () => html`<bcg-tabs>
  <bcg-tab-button slot="tab">Test1</bcg-tab-button>
  <bcg-tab-panel slot="panel">Panel Test1</bcg-tab-panel>
</bcg-tabs> `;

export const Default = Template.bind({});
