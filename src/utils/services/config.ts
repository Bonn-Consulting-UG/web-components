// Base
const APIVersion = 'v1';

const getApiUrl = () => {
  if (location.href.includes(`-dev`))
    return 'https://epart-api-dev.ifok.digital';
  if (location.href.includes(`-nonprod`))
    return 'https://epart-api-nonprod.ifok.digital';
  if (location.href.includes(`a4plus`)) return 'https://epart-api.ifok.digital';
  return 'https://epart-api-dev.ifok.digital';
};

const baseURLwithApiVersion = `${getApiUrl()}/${APIVersion}`;

// Login/User
export const registerEndpoint = `${baseURLwithApiVersion}/register`;

export const loginEndpoint = `${baseURLwithApiVersion}/login`;

export const refreshAccessToken = `${baseURLwithApiVersion}/auth/refresh-token`;

export const depleteUserEndpoint = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}`;

export const changeUserPasswordEndpoint = (userID: string) =>
  `${baseURLwithApiVersion}/users/${userID}/change-password`;

export const changePasswordEndpoint = `${baseURLwithApiVersion}/auth/redeem-reset-password-token`;

// export const changePasswordEndpoint = `${baseURLwithApiVersion}/auth/redeem-reset-password-token`;

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

export const mapSubmissionEndpoint = (moduleID: any) =>
`${baseURLwithApiVersion}/submissions/map`;

export const getSubmissionsEndpointforModule = (submissionId: number) =>
  `${baseURLwithApiVersion}/modules/${submissionId}/submissions`;
  
export const getSubmissionsEndpoint = (submissionId: number) =>
  `${baseURLwithApiVersion}/submissions/${submissionId}`;

// Modules
export const getAllModulesEndpoint = `${baseURLwithApiVersion}/modules`;
export const getModuleEndpoint = (moduleId: number) =>
  `${baseURLwithApiVersion}/modules/${moduleId}`;

// Comments
export const commentDelteEndPoint = (commentId: number) =>
  `${baseURLwithApiVersion}/comments/${commentId}`;

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

// Mapbox
export const getReverseGeocodingEndpoint = (longitude: number, latitude: number, accessToken: string) => 
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;
