import watchAuthentication from './auth/sagas';
import watchFetchChangelog from './changelog/changelogSaga';
import watchGetLanguages, { watchSetCurrentLanguage } from './languages/saga';
import watchFetchChallenges, {
  watchCreateChallenge,
  watchDeleteChallenge,
  watchReorderChallenge,
  watchSelectChallenge, watchSetChallengePublished,
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
  watchSelectCombination,
  watchSetSelectedCombinationText,
  watchUploadCombinationImage
} from './combinations/saga';
import watchFetchMeasures, {
  watchCreateMeasure,
  watchDeleteMeasure,
  watchUpdateMeasureText,
  watchUploadMeasureImage
} from './measures/saga';
import watchSetActiveTab from './appSettings/saga';
import watchFetchCategories, {
  watchCreateCategory, watchDeleteCategory, watchReorderCategory, watchSelectCategory,
  watchSetCategoryPublished, watchSetCategoryTitle, watchUploadCategoryImage
} from './categories/saga';

const root = function* rootSaga() {
  yield [
    watchFetchChangelog(),
    watchAuthentication(),
    watchGetLanguages(),
    watchSetCurrentLanguage(),
    watchFetchCategories(),
    watchFetchChallenges(),
    watchCreateCategory(),
    watchCreateChallenge(),
    watchSetCategoryPublished(),
    watchSetChallengePublished(),
    watchDeleteCategory(),
    watchDeleteChallenge(),
    watchFetchQuestions(),
    watchCreateQuestion(),
    watchRemoveQuestion(),
    watchAddAlternative(),
    watchRemoveAlternative(),
    watchReorderQuestion(),
    watchReorderAnswers(),
    watchGetLabels(),
    watchSetCategoryTitle(),
    watchSetChallengeTitle(),
    watchUpdateQuestionText(),
    watchUpdateAnswerText(),
    watchUploadCategoryImage(),
    watchUploadChallengeImage(),
    watchUploadAnswerImage(),
    watchReorderCategory(),
    watchReorderChallenge(),
    watchFetchCombinations(),
    watchFetchMissingCombinations(),
    watchFetchInvalidCombinations(),
    watchFetchAllPossibleCombinations(),
    watchCreatOrUpdateCombination(),
    watchSetSelectedCombinationText(),
    watchAddMeasureToCombination(),
    watchFetchMeasures(),
    watchDeleteMeasure(),
    watchCreateMeasure(),
    watchUploadMeasureImage(),
    watchUpdateMeasureText(),
    watchRemoveMeasureFromCombination(),
    watchUploadCombinationImage(),
    watchSetActiveTab(),
    watchSelectCategory(),
    watchSelectChallenge(),
    watchSelectCombination(),
  ];
};

export default root;
