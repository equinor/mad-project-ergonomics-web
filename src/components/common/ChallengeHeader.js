import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { toast } from 'react-toastify';
import { Button } from '@equinor/eds-core-react';
import { getPlaceholderText, getText } from '../../utils/helpers';
import IconDelete from '../../../resources/images/delete_24px.svg';
import { getSelectedChallenge, getSomeChallengeIsSelected } from '../../store/challenges/reducer';
import * as challengeActions from '../../store/challenges/actions';
import ImageDrop from './ImageDrop';
import AppMenuBar from './AppMenuBar';


const HeaderSection = styled.div`
  display:flex;
  margin: 60px;
  justify-content: center;
  align-items: center;
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
      <>
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
          <Button variant={'ghost'}
                  onClick={() => {
                    deleteChallenge(selectedChallenge.id);
                    return toast(`Deleted Challenge "${getText(selectedChallenge)}"`);
                  }}
          >
            <img src={IconDelete} alt={'Delete Challenge'}/>
            Slett utfordring
          </Button>
        </HeaderSection>
        <AppMenuBar/>
      </>
      }
    </>;
  }
}

const mapStateToProps = (state) => ({
  someChallengeIsSelected: getSomeChallengeIsSelected(state),
  selectedChallenge: getSelectedChallenge(state),
});

const mapDispatchToProps = dispatch => ({
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

