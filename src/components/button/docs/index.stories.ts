import { html, TemplateResult } from '@lion/core';
import '../index.js';

export default {
  title: 'Components/Button',
  component: 'bcg-button',
  argTypes: {
    label: {},
    variant: { control: 'radio', options: ['primary', 'secondary', 'tertiary'] }
  }
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label: string;
  variant: string;
}

const Template: Story<ArgTypes> = args =>
  html`
    <bcg-button variant="${args.variant}" @click="${() => console.log('click')}"
      >${args.label}</bcg-button
    >
  `;

const Default = Template.bind({});

Default.args = {
  label: 'Mehr Laden',
  variant: 'primary'
};

export { Default };

// const SubmitTemplate: Story<ArgTypes> = args =>
//   html`
//     <bcg-button @click="${() => console.log('click')}"
//       >${args.label}</bcg-button
//     >
//   `;

// const Submit = SubmitTemplate.bind({});

// Submit.args = {
//   label: 'Submit'
// };
