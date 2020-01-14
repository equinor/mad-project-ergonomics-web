import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { getChallenges, getIsFetchingChallenges } from '../../store/challenges';
import { getIsFetchingQuestions, getQuestions } from '../../store/questions';
import { getIsFetchingLabels } from '../../store/labels';
import { getSomeChallengeIsSelected } from '../../store/challenges/reducer';
import * as challengeActions from '../../store/challenges/actions';
import * as questionActions from '../../store/questions/actions';
import Question from './Question';


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

const Button = styled.button`
  border: 1px solid #007079;
  border-radius: 4px;

  color: #FFFFFF;
  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 1px;

  background: #007079;
  box-sizing: border-box;

  padding:16px 36px;

  margin: 16px;
`;

class ChallengeBody extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    reorderQuestion: PropTypes.func.isRequired,
    createQuestion: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    someChallengeIsSelected: PropTypes.bool.isRequired,
    challenges: PropTypes.array.isRequired
  };

  render() {
    const { reorderQuestion, someChallengeIsSelected, isFetching, questions, createQuestion, challenges } = this.props;
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
          <Button
            onClick={() => createQuestion()}
          >
            Nytt spørsmål
          </Button>
        </QuestionView>
      );
    }
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
});

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(challengeActions.fetchChallenges()),
  selectChallenge: (challenge) => {
    dispatch(challengeActions.selectChallenge(challenge));
    dispatch(questionActions.fetchQuestions(challenge.id));
  },
  createChallenge: () => dispatch(challengeActions.createChallenge()),
  createQuestion: () => dispatch(questionActions.createQuestion()),
  reorderQuestion: (payload) => dispatch(questionActions.reorderQuestions(payload)),
  deleteChallenge: challengeId => dispatch(challengeActions.deleteChallenge(challengeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeBody);

