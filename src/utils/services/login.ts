/* eslint-disable import/extensions */
const APIVersion = 'v1';
const baseURLwithApiVersion = `https://ifok-epart-api-dev.bonnconsulting.group/api/${APIVersion}`;
const registerEndpoint = `${baseURLwithApiVersion}/register`;
const loginEndpoint = `${baseURLwithApiVersion}/login`;
const depleteUser = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}/delete`;

const changePassword = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}/patch`;

const changeUserData = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}/delete`;

const checkVerifyCodeEndpoint = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}/verify`;

export const sendRegisterRequest = async (newUser: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    };

    const resp = await fetch(registerEndpoint, fetchOptions);

    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const checkVerifyCode = async (userID: any, code: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    };

    const resp = await fetch(checkVerifyCodeEndpoint(userID), fetchOptions);
    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendLoginRequest = async (user: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    const resp = await fetch(loginEndpoint, fetchOptions);
    return resp.json();
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendUserDataChangeRequest = async (user: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    const resp = await fetch(changeUserData('1'), fetchOptions);
    console.log('sent');
    return resp.json();
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendPasswordChangeRequest = async (user: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    const resp = await fetch(changePassword('1'), fetchOptions);
    console.log('sent');
    return resp.json();
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendUserDeleteRequest = async (user: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    const resp = await fetch(depleteUser('1'), fetchOptions);
    console.log('sent');
    return resp.json();
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};
