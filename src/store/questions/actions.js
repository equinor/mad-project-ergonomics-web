import { createAction } from 'redux-actions';

export const fetchQuestions = createAction('Questions/GET');
export const fetchQuestionsRequested = createAction('Questions/GET_REQUESTED');
export const fetchQuestionsSucceeded = createAction('Questions/GET_SUCCEEDED');
export const fetchQuestionsFailed = createAction('Questions/GET_FAILED');

export const selectAnswer = createAction('Questions/SELECT_ANSWER');
export const selectAnswers = createAction('Questions/SELECT_ARRAY_OF_ANSWERS');

export const removeQuestion = createAction('Question/remove');

export const reorderQuestions = createAction('Question/Reorder');
export const reorderQuestionsState = createAction('Question/Reorder_update_local-state');
export const reorderQuestionsSucceeded = createAction('Question/Reorder_API_SUCCESS');
export const reorderQuestionsFailed = createAction('Question/Reorder_FAILED');

export const reorderAnswers = createAction('Question-Answer/Reorder');
export const reorderAnswersState = createAction('Question-Answer/Reorder_update_state');
export const reorderAnswersFailed = createAction('Question-Answer/Reorder -> FAILED');
export const reorderAnswersSucceeded = createAction('Question-Answer/Reorder -> SUCCESS');


export const removeAlternative = createAction('Question-Answer/REMOVE');
export const removeAlternativeSucceeded = createAction('Remove_alternative/SUCCEEDED');
export const removeAlternativeFailed = createAction('Remove_alternative/FAILED');

export const createQuestion = createAction('NEW_Question/Create');
export const createQuestionRequested = createAction('NEW_Question/Post_Requested');
export const createQuestionSucceeded = createAction('NEW_Question/Post_Succeeded');
export const createQuestionFailed = createAction('NEW_Question/Post_FAILED');


export const addAlternative = createAction('ADD_ALTERNATIVE');
export const addAlternativeRequested = createAction('ADD_ALTERNATIVE/POST_REQUESTED');
export const addAlternativeSucceeded = createAction('ADD_ALTERNATIVE/POST_SUCCEEDED');
export const addAlternativeFailed = createAction('ADD_ALTERNATIVE/POST_FAILED');

export const updateAnswerText = createAction('Answer/UPDATE');
export const updateAnswerTextFailed = createAction('AnswerText/UPDATE_Failed');
export const updateAnswerTextSucceeded = createAction('AnswerText/UPDATE_Succeeded');
export const updateAnswerTextRequested = createAction('AnswerText/UPDATE_Requested');

export const updateQuestionText = createAction('Question/UpdateText');
export const updateQuestionTextFailed = createAction('QuestionText/UPDATE_Failed');
export const updateQuestionTextSucceeded = createAction('QuestionText/UPDATE_Succeeded');
export const updateQuestionTextRequested = createAction('QuestionText/UPDATE_Requested');

// IMAGE UPLOAD (Answer)
export const uploadAnswerImage = createAction('Answer_IMAGE');
export const uploadAnswerImageRequested = createAction('Answer_IMAGE/POST_REQUESTED');
export const uploadAnswerImageSucceeded = createAction('Answer_IMAGE/POST_SUCCEEDED');
export const uploadAnswerImageFailed = createAction('Answer_IMAGE/POST_FAILED');
