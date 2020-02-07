import * as actions from './actions';
import { stateKeys } from '../../types';
import reducer, {
  getAllQuestionsAreAnswered,
  getIsFetchingQuestions,
  getQuestions
} from './reducer';
import {
  Challenge197Questions,
  MissingCombinationsForChallenge197 as MissingCombinations,
  Questions as MockedQuestions,
  QuestionsWithoutText as MockedQuestionsNoText
} from '../../mockData/mock-data.json';

const defaultState = { questions: [], loading: false };
let state = {
  [stateKeys.QUESTIONS]: {},
};

function updateState(action) {
  state = {
    [stateKeys.QUESTIONS]: reducer(state.questions, action),
  };
}

describe('Questions actions, reducers and selectors', () => {
  beforeEach(() => {
    state = { [stateKeys.QUESTIONS]: { ...defaultState } };
  });

  it('should fetch questions, changing the fetching status accordingly and ultimately succeed', () => {
    updateState(actions.fetchQuestionsRequested());
    expect(getIsFetchingQuestions(state))
      .toBe(true);
    updateState(actions.fetchQuestionsSucceeded(MockedQuestions));
    expect(getIsFetchingQuestions(state))
      .toBe(false);
    expect(getQuestions(state))
      .toEqual(MockedQuestions);
  });

  it('knows when all questions have an answer selected', () => {
    updateState(actions.fetchQuestionsSucceeded(MockedQuestions));
    // No questions answered
    expect(getAllQuestionsAreAnswered(state))
      .toBe(false);

    updateState(actions.selectAnswer({ answerId: MockedQuestions[0].answers[0].id }));
    // 1 out of 3 question answered
    expect(getAllQuestionsAreAnswered(state))
      .toBe(false);

    updateState(actions.selectAnswer({ answerId: MockedQuestions[1].answers[0].id }));
    // 2 out of 3 questions are answered
    expect(getAllQuestionsAreAnswered(state))
      .toBe(false);

    updateState(actions.selectAnswer({ answerId: MockedQuestions[2].answers[0].id }));
    // 3 out of 3 questions are answered
    expect(getAllQuestionsAreAnswered(state))
      .toBe(true);

    updateState(actions.selectAnswer({ answerId: MockedQuestions[2].answers[1].id }));
    // Should still be valid when selecting another answer in the same question
    expect(getAllQuestionsAreAnswered(state))
      .toBe(true);
  });

  it('selects one answer and deselects all the other ones', () => {
    updateState(actions.fetchQuestionsSucceeded(MockedQuestions));

    // Only the last selected question should be selected
    updateState(actions.selectAnswer({ answerId: MockedQuestions[0].answers[0].id }));
    expect(getQuestions(state)[0].answers[0].isSelected)
      .toBe(true);
    expect(getQuestions(state)[0].answers[1].isSelected)
      .toBe(false);
    expect(getQuestions(state)[0].answers[2].isSelected)
      .toBe(false);

    updateState(actions.selectAnswer({ answerId: MockedQuestions[0].answers[1].id }));
    expect(getQuestions(state)[0].answers[0].isSelected)
      .toBe(false);
    expect(getQuestions(state)[0].answers[1].isSelected)
      .toBe(true);
    expect(getQuestions(state)[0].answers[2].isSelected)
      .toBe(false);

    updateState(actions.selectAnswer({ answerId: MockedQuestions[0].answers[2].id }));
    expect(getQuestions(state)[0].answers[0].isSelected)
      .toBe(false);
    expect(getQuestions(state)[0].answers[1].isSelected)
      .toBe(false);
    expect(getQuestions(state)[0].answers[2].isSelected)
      .toBe(true);

  });

  it('changes current image when selecting an alternative', () => {
    updateState(actions.fetchQuestionsSucceeded(MockedQuestions));
    updateState(actions.selectAnswer({ answerId: MockedQuestions[0].answers[0].id }));
    expect(getQuestions(state)[0].graphicId)
      .toBe(getQuestions(state)[0].answers[0].graphicId);

    updateState(actions.selectAnswer({ answerId: MockedQuestions[0].answers[1].id }));
    expect(getQuestions(state)[0].graphicId)
      .toBe(getQuestions(state)[0].answers[1].graphicId);
  });

  it('can select missing answers', () => {
    updateState(actions.fetchQuestionsSucceeded(Challenge197Questions));

    MissingCombinations.forEach(question => {
      question.answers.forEach(answer => {

        const answerId = answer.id;
        //  Select all the answers
        updateState(actions.selectAnswer({ answerId }));
      });

      // Then check if we have selected all the required answers to add a result to it...
      expect(getAllQuestionsAreAnswered(state))
        .toBe(true);
    });

  });

  it('can select an array of answerIds', () => {
    updateState(actions.fetchQuestionsSucceeded(MockedQuestions));
    const answerIdArray = [];
    MockedQuestions.forEach(question => {
      answerIdArray.push(question.answers[0].id);
    });

    updateState(actions.selectAnswers({ answerIdArray }));
    expect(getAllQuestionsAreAnswered(state))
      .toBe(true);

  });

  it('can update a question text', () => {
    updateState(actions.fetchQuestionsSucceeded(MockedQuestions));

    const newText = 'Hello World!';
    const questionId = MockedQuestions[0].id;

    updateState(actions.updateQuestionText({
      questionId, newText
    }));

    expect(getQuestions(state)[0].currentTranslation.text)
      .toBe(newText);

    // can update a question text even when currentTranslation === null
    updateState(actions.fetchQuestionsSucceeded(MockedQuestionsNoText));
    updateState(actions.updateQuestionText({
      questionId, newText
    }));
    expect(getQuestions(state)[0].currentTranslation.text)
      .toBe(newText);
  });

  it('can update answer text', () => {
    updateState(actions.fetchQuestionsSucceeded(MockedQuestions));

    const newText = 'Way to heavy!';
    const languageCode = 'NO';
    const answerToUpdate = MockedQuestions[0].answers[2];
    const questionId = MockedQuestions[0].id;
    const answerId = answerToUpdate.id;

    updateState(actions.updateAnswerText(
      { questionId, answerId, newText }
    ));

    expect(getQuestions(state)[0].answers[2].currentTranslation.text)
      .toBe(newText);

    // can update answer text even when currentTranslation === null
    updateState(actions.fetchQuestionsSucceeded(MockedQuestionsNoText));
    updateState(actions.updateAnswerText(
      { questionId, answerId, newText, languageCode }
    ));
    expect(getQuestions(state)[0].answers[2].currentTranslation.text)
      .toBe(newText);
  });


  it('can remove a question', () => {
    updateState(actions.fetchQuestionsSucceeded(MockedQuestions));
    updateState(actions.removeQuestion(MockedQuestions[0]));
    expect(getQuestions(state)[0].id)
      .not
      .toBe(MockedQuestions[0].id);
  });


  it('can add a new question', () => {
    updateState(actions.fetchQuestionsSucceeded(MockedQuestions));
    const newQuestion = ({
      'id': 178,
      'currentTranslation': null,
      'answers': [],
      'number': 4,
      'graphicId': null
    });
    updateState(actions.createQuestionSucceeded(newQuestion));
    expect(getQuestions(state)[MockedQuestions.length])
      .toBe(newQuestion); // Expect it to be last
  });


  it('can reorder a question', () => {
    updateState(actions.fetchQuestionsSucceeded(MockedQuestions));

    expect(getQuestions(state)[0])
      .toEqual(MockedQuestions[0]);

    // Moving the first challenge one down
    let oldIndex = 0;
    let newIndex = 1;
    updateState(actions.reorderQuestionsState({ oldIndex, newIndex }));

    expect(getQuestions(state)[1])
      .toEqual(MockedQuestions[0]);

    // Move the second (mocked) challenge to the end (currently first in the state)
    // then
    // The mockedChallenge[0] should now be first again in the state
    oldIndex = 0;
    newIndex = MockedQuestions.length - 1;
    updateState(actions.reorderQuestionsState({ oldIndex, newIndex }));
    expect(getQuestions(state)[0])
      .toEqual(MockedQuestions[0]);
    // And the moved challenge should be last...
    expect(getQuestions(state)[newIndex])
      .toEqual(MockedQuestions[1]);

  });

  it('can reorder answers', () => {
    updateState(actions.fetchQuestionsSucceeded(MockedQuestions));
    // Switch places for the 1. and 2. elements
    const question = getQuestions(state)[0];
    const oldIndex = 0;
    const newIndex = 1;
    updateState(actions.reorderAnswersState({ oldIndex, newIndex, question }));

    expect(MockedQuestions[0].answers[oldIndex])
      .toEqual(getQuestions(state)[0].answers[newIndex]);
  });
});
