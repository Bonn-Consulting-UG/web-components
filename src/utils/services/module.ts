import {
  contactSubmissionEndpoint,
  faqSubmissionEndpoint,
  ideaSubmissionEndpoint
} from './config';

export const sendContactSubmissionRequest = async (
  payload: any,
  moduleID: any
) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
      },
      body: JSON.stringify(payload)
    };

    const resp = await fetch(contactSubmissionEndpoint(moduleID), fetchOptions);
    return resp;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const sendIdeaSubmissionRequest = async (
  payload: any,
  moduleID: any
) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
      },
      body: JSON.stringify(payload)
    };

    const resp = await fetch(ideaSubmissionEndpoint(moduleID), fetchOptions);
    return resp;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const sendFaqSubmissionRequest = async (payload: any, moduleID: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
      },
      body: JSON.stringify(payload)
    };

    const resp = await fetch(faqSubmissionEndpoint(moduleID), fetchOptions);
    return resp;
  } catch (err) {
    console.error(err);
    return err;
  }
};
