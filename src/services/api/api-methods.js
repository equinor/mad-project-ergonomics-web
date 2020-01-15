import {
  fetchData,
  fetchDataWithLanguage,
  postImage,
  submitData,
  submitDataWithLanguage
} from './api-helpers';

// COMMON API
export function getReleaseNote(version) {
  return fetchData(`/ReleaseNote/TEMPLATE/${version}`, 'common');
}

// --------------------------------------------------------------------------------------------- //

// ERGONOMICS API
// /////////////////////////////////////////////
// GET-requests
// ////////////////////////////////////////////
export const getLabels = language => fetchDataWithLanguage('/Labels', language);
export const getLanguages = () => fetchData('/Languages');
export const getQuestionsForChallenge = (challengeId, language) =>
  fetchDataWithLanguage(`/Challenges/${challengeId}/Questions`, language);
export const getChallenges = (language) => fetchDataWithLanguage(`/Challenges`, language);

export const getChallenge = (challengeId, language) => fetchDataWithLanguage(`/Challenges/${challengeId}`, language);
export const getQuestions = (challengeId, language) => fetchDataWithLanguage(`/Challenges/${challengeId}/Questions`, language);
export const getGraphic = (graphicId) => fetchData(`/Graphics/${graphicId}`, `Ergonomics`, true);
// --------------------------------------------------------------------------------------------- //


// /////////////////////////////////////////////
// POST-requests
// ////////////////////////////////////////////
export const newChallenge = () => submitDataWithLanguage(`/Challenges`);
export const newQuestion = (challengeId) => submitDataWithLanguage(`/Challenges/${challengeId}/Questions`);
export const newAnswerAlternative = (questionId) => submitDataWithLanguage(`/Questions/${questionId}/Answers`);

// GRAPHICS
export const uploadImage = (parentEntity, id, image) => postImage(`/Graphics/${parentEntity}/${id}`, image);
export const uploadChallengeImage = ({ challengeId, image }) => uploadImage('Challenges', challengeId, image);
export const uploadAnswerImage = ({ answerId, image }) => uploadImage('Answers', answerId, image);

// /ReOrdering things
export const orderChallenges = (challenges) => submitDataWithLanguage(`/Challenges/ordering`, challenges);
export const orderQuestions = (challengeId, questions) => submitDataWithLanguage(`/Challenges/${challengeId}/Questions/ordering`, questions);
export const orderAnswers = (questionId, answers) => submitDataWithLanguage(`/Questions/${questionId}/Answers/ordering`, answers);
// --------------------------------------------------------------------------------------------- //


// /////////////////////////////////////////////
// PATCH-requests
// ////////////////////////////////////////////
/**
 *
 * @param parentEntity => "Challenges","Questions" or "Answers".
 * @param id => The id of the parentEntity
 * @param languageCode => "EN","NO" etc...
 * @param text => The updated text
 * @return {Promise<unknown>}
 */
export const patchTranslation = (parentEntity, id, languageCode, text) => submitData(`/${parentEntity}/${id}/Translations`, {
  languageCode,
  text
}, `PATCH`);

export const createOrUpdateTranslation = (parentEntity, id, languageCode, text) => submitData(`/${parentEntity}/${id}/Translations`, {
  languageCode,
  text
}, `POST`);

export const updateChallengeText = ({ challengeId, text, languageCode }) => createOrUpdateTranslation('Challenges', challengeId, languageCode, text);
export const updateQuestionText = ({ questionId, text, languageCode }) => createOrUpdateTranslation('Questions', questionId, languageCode, text);
export const updateAnswerText = ({ answerId, text, languageCode }) => createOrUpdateTranslation('Answers', answerId, languageCode, text);

export const patchLanguage = (languageCode, id, code, name) => submitData(`/Languages/${id}`, {
  id,
  code,
  name
}, `PATCH`);
// --------------------------------------------------------------------------------------------- //


// /////////////////////////////////////////////
// DELETE-requests
// ////////////////////////////////////////////

export const deleteLanguage = (id) => submitData(`/Languages/${id}`, null, `DELETE`);
export const deleteAnswer = (id) => submitData(`/Answers/${id}`, null, `DELETE`);
export const deleteQuestion = (id) => submitData(`/Questions/${id}`, null, `DELETE`);
export const deleteChallenge = (id) => submitData(`/Challenges/${id}`, null, `DELETE`);
