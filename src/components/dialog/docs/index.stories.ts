import { html, TemplateResult } from 'lit';
import '../index.js';

export default {
  title: 'Dialog',
  component: 'bcg-dialog',
  argTypes: {
    content: {
      options: [],
    },
  },
};

interface ContentArgs {
  button: string;
}

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  content: Array<ContentArgs>;
}

const Template: Story<ArgTypes> = () => html`
  <bcg-dialog>
    <button slot="invoker">Click me to open dialog</button>
    <div slot="content" class="dialog">
      Hello! You can close this dialog here:
      <button
        class="close-button"
        @click=${(e: { target: { dispatchEvent: (arg0: Event) => any } }) =>
          e.target.dispatchEvent(new Event('close-overlay', { bubbles: true }))}
      >
        ⨯
      </button>
    </div></bcg-dialog
  >
`;

export const Default = Template.bind({});
