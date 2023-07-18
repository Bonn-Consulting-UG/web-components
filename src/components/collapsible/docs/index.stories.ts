import { html } from '@lion/core';
import { Story } from '../../../model/story-interfaces';
import '../index';

export default {
  title: 'Components/Collapsible',
  component: 'bcg-collapsible',
};

interface ArgTypes {
  content: string;
  buttonLabel: string;
}

const Template: Story<ArgTypes> = args =>
  html`
    <bcg-collapsible>
      <bcg-collapsilbe-button class="invoker" slot="invoker"
        >${args.buttonLabel}</bcg-collapsilbe-button
      >
      <div slot="content">${args.content}</div></bcg-collapsible
    >
    <hr />
    <bcg-collapsible>
      <bcg-collapsilbe-button class="invoker" slot="invoker"
        >${args.buttonLabel}</bcg-collapsilbe-button
      >
      <div slot="content">${args.content}</div></bcg-collapsible
    >
  `;
const Default = Template.bind({});

Default.args = {
  buttonLabel: 'How many comments can I post?',
  content: `25 comments. Consectetur minim voluptate id officia nisi laborum id exercitation. Ea officia sint anim ut consectetur ullamco. Labore duis pariatur cupidatat anim cupidatat nostrud labore nulla. `,
};

export { Default };
