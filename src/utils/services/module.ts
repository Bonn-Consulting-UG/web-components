import {
  contactSubmissionEndpoint,
  faqSubmissionEndpoint,
  ideaSubmissionEndpoint,
  getModuleEndpoint,
  getSubmissionsEndpoint,
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
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(payload),
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
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(payload),
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
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(payload),
    };

    const resp = await fetch(faqSubmissionEndpoint(moduleID), fetchOptions);
    return resp;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getModule = async (moduleID: any) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const resp = await fetch(getModuleEndpoint(moduleID), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateModule = async (moduleID: any, updatedData: any) => {
  try {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ ...updatedData }),
    };

    const resp = await fetch(getModuleEndpoint(moduleID), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateSubmission = async (moduleID: any, updatedData: any) => {
  try {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ ...updatedData }),
    };

    const resp = await fetch(getSubmissionsEndpoint(moduleID), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const deleteModule = async (moduleID: any) => {
  try {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };

    const resp = await fetch(getModuleEndpoint(moduleID), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};
