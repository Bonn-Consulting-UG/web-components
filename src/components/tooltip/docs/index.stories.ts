import { html, TemplateResult } from 'lit';
import '../index.js';
import '../../textarea/index.js';

export default {
  title: 'Components/Tooltip',
  component: 'bcg-tooltip',
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

const Template: Story<ArgTypes> = () => html` <bcg-tooltip has-arrow>
  <button slot="invoker" class="demo-tooltip-invoker">Hover me</button>
  <div slot="content">This is a tooltip</div>
</bcg-tooltip>`;

export const Default = Template.bind({});
