import watchAuthentication from './auth/sagas';
import watchFetchChangelog from './changelog/changelogSaga';
import watchGetLanguages, { watchSetCurrentLanguage } from './languages/saga';
import watchFetchChallenges, {
  watchCreateChallenge,
  watchDeleteChallenge,
  watchReorderChallenge, watchSelectChallenge,
  watchSetChallengeTitle,
  watchUploadChallengeImage
} from './challenges/saga';
import watchFetchQuestions, {
  watchAddAlternative,
  watchCreateQuestion,
  watchRemoveAlternative,
  watchRemoveQuestion,
  watchReorderAnswers,
  watchReorderQuestion,
  watchUpdateAnswerText,
  watchUpdateQuestionText,
  watchUploadAnswerImage
} from './questions/saga';
import watchGetLabels from './labels/saga';
import {
  watchAddMeasureToCombination,
  watchCreatOrUpdateCombination,
  watchFetchAllPossibleCombinations,
  watchFetchCombinations,
  watchFetchInvalidCombinations,
  watchFetchMissingCombinations,
  watchRemoveMeasureFromCombination,
  watchSetSelectedCombinationText,
  watchUploadCombinationImage
} from './combinations/saga';
import watchFetchMeasures from './measures/saga';
import watchSetActiveTab from './appSettings/saga';

const root = function* rootSaga() {
  yield [
    watchFetchChangelog(),
    watchAuthentication(),
    watchGetLanguages(),
    watchSetCurrentLanguage(),
    watchFetchChallenges(),
    watchCreateChallenge(),
    watchDeleteChallenge(),
    watchFetchQuestions(),
    watchCreateQuestion(),
    watchRemoveQuestion(),
    watchAddAlternative(),
    watchRemoveAlternative(),
    watchReorderQuestion(),
    watchReorderAnswers(),
    watchGetLabels(),
    watchSetChallengeTitle(),
    watchUpdateQuestionText(),
    watchUpdateAnswerText(),
    watchUploadChallengeImage(),
    watchUploadAnswerImage(),
    watchReorderChallenge(),
    watchFetchCombinations(),
    watchFetchMissingCombinations(),
    watchFetchInvalidCombinations(),
    watchFetchAllPossibleCombinations(),
    watchCreatOrUpdateCombination(),
    watchSetSelectedCombinationText(),
    watchAddMeasureToCombination(),
    watchFetchMeasures(),
    watchRemoveMeasureFromCombination(),
    watchUploadCombinationImage(),
    watchSetActiveTab(),
    watchSelectChallenge(),
  ];
};

export default root;
