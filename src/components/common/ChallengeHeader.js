import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { toast } from 'react-toastify';
import { getPlaceholderText, getText } from '../../utils/helpers';
import IconDelete from '../../../resources/images/delete_24px.svg';
import { getChallenges, getIsFetchingChallenges } from '../../store/challenges';
import { getIsFetchingQuestions, getQuestions } from '../../store/questions';
import { getIsFetchingLabels } from '../../store/labels';
import { getSelectedChallenge, getSomeChallengeIsSelected } from '../../store/challenges/reducer';
import * as challengeActions from '../../store/challenges/actions';
import * as questionActions from '../../store/questions/actions';
import ImageDrop from './ImageDrop';


const HeaderSection = styled.div`
  display:flex;
  height:200px;
  border-bottom: 1px solid #E6E6E6;
  margin: 32px;
  justify-content: center;
  align-items: center;
  padding-bottom: 18px;
`;

const ChallengeTitleTextBox = styled.div`
  display: flex;
  width: 50%;
`;

const ChallengeTitleTextInput = styled.input`
  border: 0 solid white;
  border-bottom: 1px solid #243746;

  flex:1;
  background-color: #F7F7F7;
  border-radius: 4px 4px 0 0;
  height:60px;
  padding: 0 30px 0;

  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
`;

const ImagePlaceholderContainer = styled.div`
  display: flex;
  border-radius: 8px;
  margin:10px 15px;

   ${props =>
  props.invisible &&
  css`
      background-color: transparent;
    `};
`;

const ButtonWithLabel = styled.button`
  padding: 8px;
  font-family: Equinor,sans-serif;
  border: 0 solid white;
  display: flex;
  min-width: 48px;
  border-radius: 4px;
  margin:8px;

  background-color: transparent;

  align-items: center;
  justify-content: flex-start;

  ${props => {
  return props.active && css`
    background-color: #DEEDEE;
  `;
}};
`;

const DrawerLabel = styled.div`
  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  letter-spacing: 0.7px;

  color:#243746;

  padding-left: 20px;
  padding-right: 8px;
  ${props => {
  return props.active && css`
    color:  #007079;
  `;
}};

`;


class ChallengeHeader extends Component {
  static propTypes = {
    someChallengeIsSelected: PropTypes.bool.isRequired,
    selectedChallenge: PropTypes.object,
    deleteChallenge: PropTypes.func.isRequired,
    uploadChallengeImg: PropTypes.func.isRequired,
    setChallengeTitle: PropTypes.func.isRequired
  };

  static defaultProps = {
    selectedChallenge: {}
  };

  render() {
    const { selectedChallenge, someChallengeIsSelected, deleteChallenge, uploadChallengeImg, setChallengeTitle } = this.props;
    return <>
      {someChallengeIsSelected &&
      <HeaderSection>
        <ChallengeTitleTextBox>
          <ImagePlaceholderContainer>
            <ImageDrop uploadImg={uploadChallengeImg} parentEntity={selectedChallenge}/>
          </ImagePlaceholderContainer>

          <ChallengeTitleTextInput
            placeholder={getPlaceholderText(selectedChallenge) || 'Write some title here...'}
            value={getText(selectedChallenge) || ''}
            onChange={(change) => setChallengeTitle(selectedChallenge.id, change.target.value)}
          />
        </ChallengeTitleTextBox>
        <ButtonWithLabel
          onClick={() => {
            deleteChallenge(selectedChallenge.id);
            return toast(`Deleted Challenge "${getText(selectedChallenge)}"`);
          }}
        >
          <img src={IconDelete} alt={'Delete Challenge'}/>
          <DrawerLabel active>
            Slett utfordring
          </DrawerLabel>
        </ButtonWithLabel>
      </HeaderSection>
      }
    </>;
  }
}

const mapStateToProps = (state) => ({
  isFetching: getIsFetchingChallenges(state) || getIsFetchingQuestions(state) || getIsFetchingLabels(state),
  challenges: getChallenges(state),
  questions: getQuestions(state),
  someChallengeIsSelected: getSomeChallengeIsSelected(state),
  selectedChallenge: getSelectedChallenge(state),
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
  deleteChallenge: challengeId => dispatch(challengeActions.deleteChallenge(challengeId)),
  setChallengeTitle: (challengeId, text) => dispatch(challengeActions.setChallengeTitle({
    challengeId,
    newChallengeText: text
  })),
  uploadChallengeImg: (challengeId, image) => dispatch(challengeActions.uploadChallengeImage({
    challengeId,
    image
  })),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChallengeHeader);

