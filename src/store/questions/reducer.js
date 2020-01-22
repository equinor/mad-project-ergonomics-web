import { handleActions } from 'redux-actions';
import { cloneDeep } from 'lodash';
import arrayMove from 'array-move';
import * as actions from './actions';
import { stateKeys } from '../../types';

const defaultState = { questions: [], isFetching: false, allQuestionsAreAnswered: false };
export default handleActions(
  {
    [actions.fetchQuestionsRequested]: () => ({
      ...defaultState,
      isFetching: true,
    }),
    [actions.fetchQuestionsSucceeded]: (state, action) => ({
      questions: action.payload,
      isFetching: false,
    }),
    [actions.fetchQuestionsFailed]: state => ({
      ...state,
      isFetching: false,
    }),
    [actions.updateAnswerText]: (state, action) => {
      const { questionId, answerId, newText, languageCode } = action.payload;
      const clonedState = cloneDeep(state);
      const questionToUpdate = clonedState.questions.find(question => question.id === questionId);
      const answerToUpdate = questionToUpdate.answers.find(answer => answer.id === answerId);

      answerToUpdate.currentTranslation = {
        ...answerToUpdate.currentTranslation,
        text: newText,
        languageCode
      };

      return ({
        ...clonedState,
      });
    },
    [actions.updateQuestionText]: (state, action) => {
      const { questionId, newText, languageCode } = action.payload;
      const clonedState = cloneDeep(state);

      const questionToUpdate = clonedState.questions.find(question => question.id === questionId);
      questionToUpdate.currentTranslation = {
        ...questionToUpdate.currentTranslation,
        text: newText,
        languageCode
      };

      return ({
        ...clonedState,
        isFetching: false,
      });
    },
    [actions.reorderQuestionsState]: (state, action) => {
      const questions = state.questions;
      const { oldIndex, newIndex } = action.payload;
      return ({
        questions: arrayMove(questions, oldIndex, newIndex),
      });
    },
    [actions.reorderAnswersState]: (state, action) => {
      const { oldIndex, newIndex, question } = action.payload;
      const clonedState = cloneDeep(state);
      const selectedQuestion = clonedState.questions.find(q => q.id === question.id);
      selectedQuestion.answers = arrayMove(selectedQuestion.answers, oldIndex, newIndex);
      return ({ ...clonedState });
    },
    [actions.removeAlternative]: (state, action) => {
      const { answer, question } = action.payload;
      const modifiedQuestionAnswers = question.answers.filter(a => a.id !== answer.id);
      const questions = state.questions.map(q => ({
        ...q,
        answers: q.id === question.id ? modifiedQuestionAnswers : q.answers
      }));
      return ({
        questions
      });
    },
    [actions.createQuestionSucceeded]: (state, action) => {
      const uq = action.payload;
      const questions = [...state.questions, uq];
      return ({
        questions,
        isFetching: false,
      });
    },
    [actions.removeQuestion]: (state, action) => {
      const uq = action.payload;
      const questions = state.questions.filter(q => q.id !== uq.id
      );
      return ({
        questions,
        isFetching: false,
      });
    },
    [actions.selectAnswer]: (state, action) => {
      // const { questionIndex, answerIndex } = action.payload;
      const { answerId } = action.payload;

      const clonedState = cloneDeep(state);
      let questionIndex = null;
      let answerIndex = null;

      // find the answer inside one of the questions
      for (let i = 0; i < clonedState.questions.length; i+=1) {
        const question = clonedState.questions[i];
        if (question) {
          const aIndex = question.answers.findIndex(answer => answer.id === answerId);
          if (aIndex !== -1) {
            answerIndex = aIndex;
            questionIndex = i;
            break; // We have what we came for
          }
        }
      }

      if (questionIndex !== null) {
        // clear all answers
        clonedState.questions[questionIndex].answers =
          clonedState.questions[questionIndex].answers.map(answer => {
            return { ...answer, isSelected: false };
          });
        if (answerIndex !== null) {

          // select the new answer
          clonedState.questions[questionIndex].answers[answerIndex].isSelected = true;

          // Also, let's set the question-group to answered.
          // (for our logic checking if we can show the results)
          clonedState.questions[questionIndex].isAnswered = true;

          // And set our current image to the one that is selected
          clonedState.questions[questionIndex].graphicId =
            clonedState.questions[questionIndex].answers[answerIndex].graphicId;
        }
      }

      return clonedState;
    },
    [actions.selectAnswers]: (state, action) => {
      const { answerIdArray} = action.payload;
      const clonedState = cloneDeep(state);

      answerIdArray.forEach(answerId => {

        let questionIndex = null;
        let answerIndex = null;

        // find the answer inside one of the questions
        for (let i = 0; i < clonedState.questions.length; i+=1) {
          const question = clonedState.questions[i];
          if (question) {
            const aIndex = question.answers.findIndex(answer => answer.id === answerId);
            if (aIndex !== -1) {
              answerIndex = aIndex;
              questionIndex = i;
              break; // We have what we came for
            }
          }
        }

        if (questionIndex !== null) {
          // clear all answers
          clonedState.questions[questionIndex].answers =
            clonedState.questions[questionIndex].answers.map(answer => {
              return { ...answer, isSelected: false };
            });
          if (answerIndex !== null) {

            // select the new answer
            clonedState.questions[questionIndex].answers[answerIndex].isSelected = true;

            // Also, let's set the question-group to answered.
            // (for our logic checking if we can show the results)
            clonedState.questions[questionIndex].isAnswered = true;

            // And set our current image to the one that is selected
            clonedState.questions[questionIndex].graphicId =
              clonedState.questions[questionIndex].answers[answerIndex].graphicId;
          }
        }
      });
      return clonedState;
    },
    [actions.addAlternativeSucceeded]: (state, action) => {
      const clonedState = cloneDeep(state);
      const { questionId, newAnswerAlternative } = action.payload;
      const questionToModify = clonedState.questions.find(q => q.id === questionId);
      questionToModify.answers = [...questionToModify.answers, newAnswerAlternative];
      return ({
        isFetching: false,
        ...clonedState
      });
    },
  },
  { ...defaultState }
);

export const getQuestions = state => state[stateKeys.QUESTIONS].questions;

export const getIsFetchingQuestions = state => state[stateKeys.QUESTIONS].isFetching;

export const getAllQuestionsAreAnswered = state => {
  // BaseCase, if we got no questions, then we don't have any answers
  if (state[stateKeys.QUESTIONS].questions.length < 1) return false;

  // If some question is not answered the quiz is not done.
  const someQuestionIsNotAnswered = state[stateKeys.QUESTIONS].questions.some(question => {
    return !question.isAnswered;
  });

  return !someQuestionIsNotAnswered;
};

export const getSelectedAnswers = state => {
  const questionsWithAnswers = state[stateKeys.QUESTIONS].questions.filter(
    question => question.isAnswered
  );

  const answers = [];
  questionsWithAnswers.forEach(question =>
    question.answers.forEach(answer => {
      if (answer.isSelected) {
        answers.push({ id: answer.id, number: answer.number });
      }
    })
  );
  return answers;
};

export const getQuestionAnswerAlternativesForQuestionWithId = (state, questionId) =>
  state[stateKeys.QUESTIONS].questions.find(q => q.id === questionId).answers;
