import {
  getCommentsEndpointforModule,
  setCommentsEndpoint,
  reactionEndPoint,
  reportCommentEndpoint,
  reactionDelteEndPoint,
  approveCommentEndpoint,
  censorCommentEndpoint,
  getSubmissionsEndpoint,
  commentDelteEndPoint,
} from './config';

const AuthHeader = localStorage.getItem('accessToken')
  ? `Bearer ${localStorage.getItem('accessToken')}`
  : '';

const ContentTypeHeader = 'application/json';

export const getAllCommentsForModule = async (moduleID: any) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
    };

    const resp = await fetch(
      getCommentsEndpointforModule(moduleID),
      fetchOptions
    );
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

// export const getAllSubmissionForModule = async (submissionId: any) => {
//   try {
//     const fetchOptions = {
//       method: 'GET',
//       headers: {
//         'Content-Type': ContentTypeHeader,
//         Authorization: localStorage.getItem('accessToken')
//           ? `Bearer ${localStorage.getItem('accessToken')}`
//           : '',
//       },
//     };

//     const resp = await fetch(
//       getSubmissionsEndpointforModule(submissionId),
//       fetchOptions
//     );
//     return resp.json();
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// };

export const getSubmission = async (submissionId: any) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
    };

    const resp = await fetch(
      getSubmissionsEndpoint(submissionId),
      fetchOptions
    );
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const addComment = async (
  moduleId: number,
  commentConent: any,
  submissionId: number,
  { firstName, lastName, email }: any
) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
      body: JSON.stringify({
        title: '',
        content: commentConent,
        moduleId: moduleId ? moduleId : null,
        submissionId: submissionId ? submissionId : null,
        firstName,
        lastName,
        email,
      }),
    };

    const resp = await fetch(setCommentsEndpoint, fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const addReaction = async (
  type: any,
  commentId: any,
  moduleId?: any,
  submissionId?: any
) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
      body: JSON.stringify({
        ...type,
        commentId: moduleId ? '' : commentId,
        moduleId: moduleId === 0 ? '' : moduleId,
        submissionId: submissionId === 0 ? '' : submissionId,
      }),
    };

    const resp = await fetch(reactionEndPoint, fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const removeReaction = async (reactionId: any) => {
  try {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
    };

    const resp = await fetch(reactionDelteEndPoint(reactionId), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const removeComment = async (commentId: any) => {
  try {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
    };

    // const resp = await fetch(removeDeleteEndPoint(commentId), fetchOptions);
    // return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const reportComment = async (commentId: any) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
      body: JSON.stringify({
        reason: '',
      }),
    };

    const resp = await fetch(reportCommentEndpoint(commentId), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const approveComment = async (commentId: any) => {
  try {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
    };

    const resp = await fetch(approveCommentEndpoint(commentId), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const censorComment = async (commentId: any) => {
  try {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
    };

    const resp = await fetch(censorCommentEndpoint(commentId), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const addCommentToComment = async (
  commentId: any,
  commentConent: any,
  { firstName, lastName, email }: any
) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
      body: JSON.stringify({
        title: '',
        content: commentConent,
        parentCommentId: commentId,
        firstName,
        lastName,
        email,
      }),
    };

    const resp = await fetch(setCommentsEndpoint, fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const deleteComment = async (commentId: any) => {
  try {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
    };

    const resp = await fetch(commentDelteEndPoint(commentId), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};



export const deleteSubmission = async (submissionId: any) => {
  try {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
    };

    const resp = await fetch(getSubmissionsEndpoint(submissionId), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};



export const editComment = async (commentId: any, commentConent: any) => {
  try {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': ContentTypeHeader,
        Authorization: AuthHeader,
      },
      body: JSON.stringify({ content: commentConent }),
    };

    const resp = await fetch(commentDelteEndPoint(commentId), fetchOptions);
    return resp.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};
