import { html, TemplateResult } from '@lion/core';

export default {
  title: 'Components/Typo',
  component: 'bcg-base',
  argTypes: {}
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

const HeaderTags: Story<ArgTypes> = () => html`
  <div>
    <h1>H1: Headline</h1>
    <h2>H2: Headline</h2>
    <h3>H3: Headline</h3>
    <p>Paragraph</p>
  </div>
`;

const Headlines = HeaderTags.bind({});

Headlines.args = {
  label: 'Mehr Laden',
  variant: 'primary'
};

export { Headlines };
