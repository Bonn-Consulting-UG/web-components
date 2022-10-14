export const tagPrefix: String = 'bcg';

interface component {
  [key: string]: any;
}

export const componentNames: component = {
  tabs: `${tagPrefix}-tabs`,
  tabbutton: `${tagPrefix}-tab-button`,
  tabpanel: `${tagPrefix}-tab-panel`,
  calendar: `${tagPrefix}-calendar`,
  card: `${tagPrefix}-card`,
  dialog: `${tagPrefix}-dialog`,
  dialogFrame: `${tagPrefix}-dialog-frame`,
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
  spamfilter: `${tagPrefix}-spamfilter`,
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
  checkbox: `${tagPrefix}-checkbox`,
  form: `${tagPrefix}-form`,
  reaction: `${tagPrefix}-reaction`,
  combobox: `${tagPrefix}-combobox`,
  listbox: `${tagPrefix}-listbox`,
  fieldset: `${tagPrefix}-fieldset`,
  icon: `${tagPrefix}-icon`,
  comment: `${tagPrefix}-comment`,
  notification: `${tagPrefix}-notification`,
  compositions: {
    comments: `${tagPrefix}-comments`,
    login: `${tagPrefix}-login`,
    logout: `${tagPrefix}-logout`,
    register: `${tagPrefix}-register`,
    inputMask: `${tagPrefix}-input-mask`,
    ideaSubmission: `${tagPrefix}-idea-submission`,
    faqSubmission: `${tagPrefix}-faq-submission`,
    contactSubmission: `${tagPrefix}-contact-submission`,
    faqOverview: `${tagPrefix}-faq-overview`,
    editUser: `${tagPrefix}-edit-user`,
    userMenu: `${tagPrefix}-user-menu`,
    reaction:{
      idea: `${tagPrefix}-idea-reaction`
    },
    dialogs: {login:`${tagPrefix}-dialogs-login`}
  }
};
