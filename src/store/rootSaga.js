import watchAuthentication from './auth/sagas';
import watchFetchChangelog from './changelog/changelogSaga';
import watchGetLanguages, { watchSetCurrentLanguage } from './languages/saga';
import watchFetchChallenges, {
  watchCreateChallenge,
  watchDeleteChallenge,
  watchReorderChallenge,
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
  ];
};

export default root;
