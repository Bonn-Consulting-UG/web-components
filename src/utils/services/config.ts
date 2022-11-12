// Base
const APIVersion = 'v1';

const getApiUrl = () => {
  if (location.href.includes(`-dev`))
    return 'https://epart-api-nonprod.ifok.digital';
  if (
    location.href.includes(`-nonprod`) ||
    location.href.includes('https://iwbk.bonnconsulting.group')
  )
    return 'https://epart-api-nonprod.ifok.digital';
  return 'https://epart-api-nonprod.ifok.digital';
};

const baseURLwithApiVersion = `${getApiUrl()}/${APIVersion}`;

// Login/User
export const registerEndpoint = `${baseURLwithApiVersion}/register`;

export const loginEndpoint = `${baseURLwithApiVersion}/login`;

export const refreshAccessToken = `${baseURLwithApiVersion}/auth/refresh-token`;

export const depleteUserEndpoint = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}`;

export const changePasswordEndpoint = `${baseURLwithApiVersion}/auth/redeem-reset-password-token`;

export const resetPasswordEndpoint = `${baseURLwithApiVersion}/auth/send-reset-password-token`;

export const changeUserDataEndpoint = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}`;

export const checkVerifyCodeEndpoint = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}/verify`;

// Forms
export const contactSubmissionEndpoint = (moduleID: any) =>
  `${baseURLwithApiVersion}/submissions/contact`;

export const faqSubmissionEndpoint = (moduleID: any) =>
  `${baseURLwithApiVersion}/submissions/faq`;

export const ideaSubmissionEndpoint = (moduleID: any) =>
  `${baseURLwithApiVersion}/submissions/idea`;

export const getSubmissionsEndpointforModule = (submissionId: number) =>
  `${baseURLwithApiVersion}/modules/${submissionId}/submissions`;

// Modules
export const getAllModulesEndpoint = `${baseURLwithApiVersion}/modules`;
export const getModuleEndpoint = (moduleId: number) =>
  `${baseURLwithApiVersion}/modules/${moduleId}`;

// Comments
export const getCommentsEndpointforModule = (moduleId: number) =>
  `${baseURLwithApiVersion}/modules/${moduleId}/comments`;

export const reportCommentEndpoint = (commentId: number) =>
  `${baseURLwithApiVersion}/comments/${commentId}/report`;

export const approveCommentEndpoint = (commentId: number) =>
  `${baseURLwithApiVersion}/comments/${commentId}/approve`;

export const censorCommentEndpoint = (commentId: number) =>
  `${baseURLwithApiVersion}/comments/${commentId}/censor`;

export const setCommentsEndpoint = `${baseURLwithApiVersion}/comments`;

export const getCommentEndpoint = (moduleId: number, commentID: number) =>
  `${baseURLwithApiVersion}/modules/${moduleId}/comments/${commentID}`;

export const setCommentEndpoont = (moduleId: number, commentID: number) =>
  getCommentEndpoint(moduleId, commentID);

export const getCommentReactionEndpoint = (
  moduleId: number,
  commentID: number
) =>
  `${baseURLwithApiVersion}/modules/${moduleId}/comments/${commentID}/reaction`;

export const getCommentReactionWithIdEndpoint = (
  moduleId: number,
  commentId: number,
  reactionId: number
) =>
  `${baseURLwithApiVersion}/modules/${moduleId}/comments/${commentId}/reaction/${reactionId}`;

// Reactions
export const reactionEndPoint = `${baseURLwithApiVersion}/reactions`;
export const reactionDelteEndPoint = (reactionId: number) =>
  `${baseURLwithApiVersion}/reactions/${reactionId}`;
