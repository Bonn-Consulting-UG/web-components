import { html } from '@lion/core';

export const eye = (filled: boolean) => html`
  <svg
    id="primary-icon-password-view-L"
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
  >
    <path id="Vector" d="M0,0H28V28H0Z" fill="none" />
    <path
      id="Vector-2"
      data-name="Vector"
      d="M0,0,17.5,19.25"
      transform="translate(5.25 4.375)"
      fill="none"
      stroke=${filled ? 'var(--primary-color)' : '#93939a'}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
    <path
      id="Vector-3"
      data-name="Vector"
      d="M7.317,6.475A4.331,4.331,0,0,1,4.375,7.613,4.375,4.375,0,0,1,1.432,0"
      transform="translate(9.625 10.763)"
      fill="none"
      stroke=${filled ? 'var(--primary-color)' : '#93939a'}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
    <path
      id="Vector-4"
      data-name="Vector"
      d="M18.156,12.994a12.9,12.9,0,0,1-5.906,1.378C3.5,14.372,0,6.5,0,6.5A14.8,14.8,0,0,1,6.344,0"
      transform="translate(1.75 7.503)"
      fill="none"
      stroke=${filled ? 'var(--primary-color)' : '#93939a'}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
    <path
      id="Vector-5"
      data-name="Vector"
      d="M0,.186A13.552,13.552,0,0,1,2.264,0c8.75,0,12.25,7.875,12.25,7.875a14.856,14.856,0,0,1-3.434,4.5"
      transform="translate(11.736 6.125)"
      fill="none"
      stroke=${filled ? 'var(--primary-color)' : '#93939a'}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
    <path
      id="Vector-6"
      data-name="Vector"
      d="M0,0A4.364,4.364,0,0,1,2.415,1.351,4.364,4.364,0,0,1,3.533,3.883"
      transform="translate(14.82 9.702)"
      fill="none"
      stroke=${filled ? 'var(--primary-color)' : '#93939a'}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
  </svg>
`;
