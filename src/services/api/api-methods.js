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
export const getAllMeasures = ({ language }) => fetchDataWithLanguage(`/Measures`, language);

// Combinations
export const getCombinations = ({ challengeId, language }) => fetchDataWithLanguage(`/Challenges/${challengeId}/Combinations`, language);
export const getMissingCombinations = ({ challengeId, language }) => fetchDataWithLanguage(`/Challenges/${challengeId}/Combinations/missingCombinations`, language);
export const getInvalidCombinations = ({ challengeId, language }) => fetchDataWithLanguage(`/Challenges/${challengeId}/Combinations/invalidCombinations`, language);
export const getCombinationResult = ({ challengeId, language }) => fetchDataWithLanguage(`/Challenges/${challengeId}/Combinations/result`, language);
export const getAllPossibleCombinations = ({ challengeId, language }) => fetchDataWithLanguage(`/Challenges/${challengeId}/Combinations/allCombinations`, language);

export const getMeasures = language => fetchDataWithLanguage('/Measures', language);
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
export const uploadCombinationImage = ({ combinationId, image }) => uploadImage('Combinations', combinationId, image);

// /ReOrdering things
export const orderChallenges = (challenges) => submitDataWithLanguage(`/Challenges/ordering`, challenges);
export const orderQuestions = (challengeId, questions) => submitDataWithLanguage(`/Challenges/${challengeId}/Questions/ordering`, questions);
export const orderAnswers = (questionId, answers) => submitDataWithLanguage(`/Questions/${questionId}/Answers/ordering`, answers);

// Combinations
export const createOrUpdateCombination = ({ challengeId, combination, language }) => submitDataWithLanguage(`/Challenges/${challengeId}/Combinations`, combination, language);
// --------------------------------------------------------------------------------------------- //


// /////////////////////////////////////////////
// PATCH-requests
// ////////////////////////////////////////////
/**
 *
 * @param parentEntity => "Challenges","Questions", "Answers", "Measures" ...
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
export const updateCombinationText = ({ combinationId, text, languageCode }) => createOrUpdateTranslation('Combinations', combinationId, languageCode, text);

export const patchLanguage = (languageCode, id, code, name) => submitData(`/Languages/${id}`, {
  id,
  code,
  name
}, `PATCH`);
// --------------------------------------------------------------------------------------------- //


// /////////////////////////////////////////////
// PUT-requests
// ////////////////////////////////////////////
// Todo:Remove challengeId = 0 ....
export const addMeasureToCombination = ({ combinationId, measureId }) =>
  submitData(`/Challenges/0/Combinations/${combinationId}/Measures/${measureId}`, null, 'PUT');


// /////////////////////////////////////////////
// DELETE-requests
// ////////////////////////////////////////////

export const deleteLanguage = (id) => submitData(`/Languages/${id}`, null, `DELETE`);
export const deleteAnswer = (id) => submitData(`/Answers/${id}`, null, `DELETE`);
export const deleteQuestion = (id) => submitData(`/Questions/${id}`, null, `DELETE`);
export const deleteChallenge = (id) => submitData(`/Challenges/${id}`, null, `DELETE`);
export const removeMeasureFromCombination = ({ combinationId, measureId }) =>
  submitData(`/Challenges/0/Combinations/${combinationId}/Measures/${measureId}`, null, 'DELETE');
