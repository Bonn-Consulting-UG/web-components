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
  collapsiblebutton: `${tagPrefix}-collapsible-button`,
  textarea: `${tagPrefix}-textarea`,
  tooltip: `${tagPrefix}-tooltip`,
  steps: `${tagPrefix}-steps`,
  button: `${tagPrefix}-button`,
  buttonreset: `${tagPrefix}-button-reset`,
  buttonsubmit: `${tagPrefix}-button-submit`,
  input: `${tagPrefix}-input`,
  radiogroup: `${tagPrefix}-radio-group`,
  radio: `${tagPrefix}-radio`,
  selectrich: `${tagPrefix}-select-rich`,
  select: `${tagPrefix}-select`,
  spamfilter: `${tagPrefix}-spamfilter`,
  inputdate: `${tagPrefix}-input-date`,
  inputpassword: `${tagPrefix}-input-password`,
  inputiban: `${tagPrefix}-input-iban`,
  inputemail: `${tagPrefix}-input-email`,
  inputdatepicker: `${tagPrefix}-input-datepicker`,
  inputrange: `${tagPrefix}-input-range`,
  inputstepper: `${tagPrefix}-input-stepper`,
  inputamount: `${tagPrefix}-input-amount`,
  inputtel: `${tagPrefix}-input-tel`,
  interactivemap: `${tagPrefix}-interactive-map`,
  inputteldropdown: `${tagPrefix}-input-tel-dropdown`,
  overlay: `${tagPrefix}-overlay`,
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
    verify: `${tagPrefix}-verify`,
    reset: `${tagPrefix}-password-reset`,
    logout: `${tagPrefix}-logout`,
    register: `${tagPrefix}-register`,
    inputMask: `${tagPrefix}-input-mask`,
    ideaSubmission: `${tagPrefix}-idea-submission`,
    faqSubmission: `${tagPrefix}-faq-submission`,
    mapOverlay: `${tagPrefix}-map-overlay`,
    mapSubmission: `${tagPrefix}-map-submission`,
    contactSubmission: `${tagPrefix}-contact-submission`,
    faqOverview: `${tagPrefix}-faq-overview`,
    editUser: `${tagPrefix}-edit-user`,
    userMenu: `${tagPrefix}-user-menu`,
    reaction: {
      idea: `${tagPrefix}-idea-reaction`,
    },
    dialogs: { login: `${tagPrefix}-dialogs-login` },
  },
};
