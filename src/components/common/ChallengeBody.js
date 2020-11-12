import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Button } from '@equinor/eds-core-react';
import { getChallenges, getIsFetchingChallenges } from '../../store/challenges';
import { getIsFetchingQuestions, getQuestions } from '../../store/questions';
import { getIsFetchingLabels } from '../../store/labels';
import { getSomeChallengeIsSelected } from '../../store/challenges/reducer';
import * as challengeActions from '../../store/challenges/actions';
import * as questionActions from '../../store/questions/actions';
import Question from './Question';
import { getCombinations, getMissingCombinations } from '../../store/combinations';


const LoadingView = styled.div`
  padding: 20vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SortableQuestionWrapper = SortableElement(({ question, order }) => {
  return <Question question={question} order={order}/>;
});

const MySortableContainer = SortableContainer(({ children }) => {
  return <ul>{children}</ul>;
});

class ChallengeBody extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    reorderQuestion: PropTypes.func.isRequired,
    createQuestion: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    someChallengeIsSelected: PropTypes.bool.isRequired,
    challenges: PropTypes.array.isRequired,
    combinations: PropTypes.array.isRequired,
  };

  render() {
    const { reorderQuestion, someChallengeIsSelected, isFetching, questions, createQuestion, challenges, combinations } = this.props;
    if (isFetching) {
      return (
        <LoadingView>
          <Spinner animation={'grow'}/>
          <p>Loading...</p>
        </LoadingView>
      );
    }
    if (someChallengeIsSelected) {
      return (<QuestionView>
          {combinations.length > 0 && <div><h2>ADVARSEL!</h2>
            <p>Det finnes {combinations.length} konfigurerte kombinasjoner for denne ergonomiske
              utfordringen. </p>
            <p><b>Dersom du legger til eller sletter ett spørsmål vil du måtte sette
              opp disse {combinations.length} kombinasjonene på nytt.</b></p>
            <p><b>Tips:</b> Det er bedre å legge til eller fjerne ett svar for ett spørsmål, da
              dette kun har innvirkning på nye kombinasjoner.</p>
          </div>}
          <MySortableContainer
            useDragHandle
            onSortEnd={reorderQuestion}
            helperClass='pop' // This adds a nice shadow to the card when moving it
          >
            {questions
              .map((question, index) => (
                <SortableQuestionWrapper key={`item-${question.id}`} index={index}
                                         order={index + 1}
                                         question={question}/>
              ))}
          </MySortableContainer>
          <Button onClick={() => createQuestion()}>
            Nytt spørsmål
          </Button>
        </QuestionView>
      );
    }
    // Todo: If no category is selected -> Please select a category
    // Todo: If there is no category to select... -> Please create a category
    return (<LoadingView>
      <h2> {challenges.length > 0 ? 'Please select or create a challenge' : '<- Please create a challenge'}</h2>
    </LoadingView>);
  }
}


const mapStateToProps = (state) => ({
  isFetching: getIsFetchingChallenges(state) || getIsFetchingQuestions(state) || getIsFetchingLabels(state),
  challenges: getChallenges(state),
  questions: getQuestions(state),
  someChallengeIsSelected: getSomeChallengeIsSelected(state),
  combinations: getCombinations(state),
  missingCombinations: getMissingCombinations(state),
});

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(challengeActions.fetchChallenges()),
  createChallenge: () => dispatch(challengeActions.createChallenge()),
  createQuestion: () => dispatch(questionActions.createQuestion()),
  reorderQuestion: (payload) => dispatch(questionActions.reorderQuestions(payload)),
  deleteChallenge: challengeId => dispatch(challengeActions.deleteChallenge(challengeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeBody);

