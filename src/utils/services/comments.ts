import {
  getCommentsEndpointforModule,
  setCommentsEndpoint,
  reactionEndPoint
} from './config';

export const getAllCommentsForModule = async (moduleID: any) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`
      },
    };

    const resp = await fetch(getCommentsEndpointforModule(moduleID), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const addCommentToModule = async (moduleID: any,commentConent:any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
   
      },
      body:JSON.stringify({
        "title": '',
        "content": commentConent,
        "moduleId": moduleID
      })
    };

    const resp = await fetch(setCommentsEndpoint, fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};



export const addReaction = async (type: any,commentId:any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
   
      },
      body:JSON.stringify({
       ...type,
        "commentId": commentId,
      })
    };

    const resp = await fetch(reactionEndPoint, fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};