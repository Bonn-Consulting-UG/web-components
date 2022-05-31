export const tagPrefix: String = 'bcg';

interface component {
  [key: string]: string;
}

export const componentNames: component = {
  tabs: `${tagPrefix}-tabs`,
  tabbutton: `${tagPrefix}-tab-button`,
  tabpanel: `${tagPrefix}-tab-panel`,
  calendar: `${tagPrefix}-calendar`,
  dialog: `${tagPrefix}-dialog`,
  accordion: `${tagPrefix}-accordion`,
  pagination: `${tagPrefix}-pagination`,
  progress: `${tagPrefix}-progress`,
  switch: `${tagPrefix}-switch`,
  collapsible: `${tagPrefix}-collapsible`,
  textarea: `${tagPrefix}-textarea`,
  tooltip: `${tagPrefix}-tooltip`,
  steps: `${tagPrefix}-steps`,
  button: `${tagPrefix}-button`,
  buttonreset: `${tagPrefix}-button-reset`,
  buttonsubmit: `${tagPrefix}-button-submit`,
  input: `${tagPrefix}-input`,
  radiogroup: `${tagPrefix}-radio-group`,
  selectrich: `${tagPrefix}-select-rich`,
  select: `${tagPrefix}-select`,
  inputdate: `${tagPrefix}-input-date`,
  inputiban: `${tagPrefix}-input-iban`,
  inputemail: `${tagPrefix}-input-email`,
  inputdatepicker: `${tagPrefix}-input-datepicker`,
  inputrange: `${tagPrefix}-input-range`,
  inputstepper: `${tagPrefix}-input-stepper`,
  inputamount: `${tagPrefix}-input-amount`,
  inputtel: `${tagPrefix}-input-tel`,
  inputteldropdown: `${tagPrefix}-input-tel-dropdown`,
  checkboxgroup: `${tagPrefix}-checkbox-group`,
  form: `${tagPrefix}-form`,
  combobox: `${tagPrefix}-combobox`,
  listbox: `${tagPrefix}-listbox`,
  fieldset: `${tagPrefix}-fieldset`,
  icon: `${tagPrefix}-icon`,
};
