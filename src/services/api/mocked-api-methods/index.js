import { Challenges, Languages, Questions, ReleaseNotes } from '../../../mockData/mock-data.json';
import mockConfig from '../../../mockData/mock-config';

// Use the delayFactor parameter to vary load
// times for specific api call methods.
const { delay } = mockConfig;

const fetchData = (data, delayFactor = 1.0) => new Promise((resolve) => {
  setTimeout(() => resolve(data), delay * delayFactor);
});

export function getReleaseNote() {
  return fetchData(ReleaseNotes, 0.5);
}

//
// export const getLabels = language => fetchDataWithLanguage('/Labels', language);
//
// export const getLanguages = () => fetchData('/Languages');
export const getLanguages = () => fetchData(Languages);
//
// export const getChallenge = (challengeId, language) => fetchDataWithLanguage(`/Challenges/${challengeId}`, language);
//
// export const getChallenges = (language) => fetchDataWithLanguage(`/Challenges`, language);
export const getChallenges = () => fetchData(Challenges);
//
// export const getQuestions = (challengeId, language) => fetchDataWithLanguage(`/Challenges/${challengeId}/Questions`, language);
// export const getQuestionsForChallenge = (challengeId, language) =>
//   fetchDataWithLanguage(`/Challenges/${challengeId}/Questions`, language);
export const getQuestionsForChallenge = () => fetchData(Questions);
//
