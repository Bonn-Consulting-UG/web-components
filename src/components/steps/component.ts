import { LionSteps, LionStep } from '@lion/steps';
import { html, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgSteps extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'bcg-step': LionStep,
      'lion-steps': LionSteps,
    };
  }

  render() {
    return html`
      <lion-steps>
        <bcg-step initial-step>
          Step 1
          <button
            type="button"
            @click=${(ev: {
              target: { parentElement: { controller: { next: () => any } } };
            }) => ev.target.parentElement.controller.next()}
          >
            Next
          </button>
        </bcg-step>
        <bcg-step>
          <button
            type="button"
            @click=${(ev: {
              target: {
                parentElement: { controller: { previous: () => any } };
              };
            }) => ev.target.parentElement.controller.previous()}
          >
            Previous
          </button>
          Step 2
          <button
            type="button"
            @click=${(ev: {
              target: { parentElement: { controller: { next: () => any } } };
            }) => ev.target.parentElement.controller.next()}
          >
            Next
          </button></bcg-step
        >
        <bcg-step>
          <button
            type="button"
            @click=${(ev: {
              target: {
                parentElement: { controller: { previous: () => any } };
              };
            }) => ev.target.parentElement.controller.previous()}
          >
            Previous
          </button>
          Step 3
        </bcg-step>
      </lion-steps>
    `;
  }
}
