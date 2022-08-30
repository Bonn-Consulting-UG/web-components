import {
  changePasswordEndpoint,
  changeUserDataEndpoint,
  checkVerifyCodeEndpoint,
  depleteUserEndpoint,
  loginEndpoint,
  registerEndpoint
} from './config';

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

    const resp = await fetch(changeUserDataEndpoint('1'), fetchOptions);
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

    const resp = await fetch(changePasswordEndpoint('1'), fetchOptions);
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
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
      },
      body: JSON.stringify({ user })
    };

    const resp = await fetch(depleteUserEndpoint(user), fetchOptions);
    localStorage.removeItem('auth-token');
    return resp.json();
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendNewVerifyCodeRequest = async (userId: any) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const resp = await fetch(checkVerifyCodeEndpoint(userId), fetchOptions);

    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};

export const sendPasswordResetRequest = async (data: any) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    };

    const resp = await fetch(changePasswordEndpoint(data), fetchOptions);

    return resp;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    return err;
  }
};
