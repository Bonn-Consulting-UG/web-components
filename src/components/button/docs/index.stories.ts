import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces.js';
import '../index.js';

export default {
  title: 'Components/Button',
  component: 'bcg-button',
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary', 'tertiary'] }
  }
};

interface ArgTypes {
  label: string;
  variant: string;
}

const BasicTemplate: Story<ArgTypes> = args =>
  html`
    <bcg-button variant="${args.variant}" @click="${() => console.log('click')}"
      >${args.label}</bcg-button
    >
  `;

const DisabledTemplate: Story<ArgTypes> = args =>
  html`
    <bcg-button
      disabled
      variant="${args.variant}"
      @click="${() => console.log('click')}"
      >${args.label}</bcg-button
    >
  `;

const TeritaryTemplate: Story<ArgTypes> = args =>
  html`
    <bcg-button variant="${args.variant}" @click="${() => console.log('click')}"
      >${args.label}</bcg-button
    >
  `;

const Basic = BasicTemplate.bind({});
const Disabled = DisabledTemplate.bind({});
const Teritary = TeritaryTemplate.bind({});

Disabled.args = {
  label: 'Mehr Laden',
  variant: 'primary'
};

Teritary.args = {
  label: 'x',
  variant: 'tertiary'
};

Basic.args = {
  label: 'Mehr Laden',
  variant: 'primary'
};

export { Basic, Disabled, Teritary };

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
