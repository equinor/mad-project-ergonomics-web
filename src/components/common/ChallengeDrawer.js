import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import IconCloseDrawer from '../../../resources/images/close_drawer.svg';
import IconOpenDrawer from '../../../resources/images/open_drawer.svg';
import IconAdd from '../../../resources/images/add_24px.svg';
import IconDragNode from '../../../resources/images/dragNode.svg';
import { getPlaceholderText, getText } from '../../utils/helpers';
import { getChallenges } from '../../store/challenges';
import * as challengeActions from '../../store/challenges/actions';
import { getDrawerIsOpen } from '../../store/appSettings';
import * as appSettingsActions from '../../store/appSettings/actions';
import ImageDrop from './ImageDrop';

const ToggleDrawerButton = styled.button`
  margin: 8px;
  background-color: transparent;
  border: 0 solid white;
`;

const Drawer = styled.div`
  background-color: white;
  border: 2px solid #F7F7F7;
`;

const DrawerAlternative = styled.div`
  padding: 8px;
  font-family: Equinor,sans-serif;
  border: 0 solid white;
  display: flex;
  min-width: 48px;
  max-width:500px;
  border-radius: 4px;
  margin:8px;

  background-color: transparent;

  align-items: center;
  justify-content: flex-start;

  &:hover {
    cursor: pointer;
    ${props => !props.active && css`
        background-color: #EFF8F8;
    `};
  }

  ${props => props.active && css`
    background-color: #DEEDEE;
  `}
`;

const DrawerIcon = styled.img`
  width:42px;
  margin: 4px;
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

const SortableChallengeWrapper = SortableElement(({ challenge, renderMethod }) => {
  return renderMethod(challenge);
});

const MySortableContainer = SortableContainer(({ children }) => {
  return <span>{children}</span>;
});

const DragHandle = SortableHandle(() => {
  return <div style={{ padding: 8, paddingLeft: 16, paddingRight: 16 }}>
    <img src={IconDragNode}
         alt={'Drag handle for reordering challenges'}/>
  </div>;
});


class ChallengeDrawer extends Component {
  static propTypes = {
    challenges: PropTypes.array.isRequired,
    createChallenge: PropTypes.func.isRequired,
    selectChallenge: PropTypes.func.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    reorderChallenges: PropTypes.func.isRequired
  };


  renderDrawerChallenge = challenge => {
    return (
      <DrawerAlternative key={`${challenge.id}`}
                         active={challenge.isSelected}
                         drawerOpen={this.props.drawerOpen}
                         onClick={() => this.props.selectChallenge(challenge)}>
        {this.props.drawerOpen && <DragHandle/>}
        <ImageDrop parentEntity={challenge}/>
        {this.props.drawerOpen &&
        <>
          <DrawerLabel active={challenge.isSelected}>
            {getText(challenge) || getPlaceholderText(challenge) || 'New challenge'}
          </DrawerLabel>
        </>
        }

      </DrawerAlternative>
    );
  };

  render() {
    const { createChallenge, drawerOpen, challenges, reorderChallenges } = this.props;
    return <Drawer open={drawerOpen}>
      <ToggleDrawerButton onClick={() => this.props.toggleDrawer()}>
        <DrawerIcon src={drawerOpen ? IconCloseDrawer : IconOpenDrawer}
                    alt={drawerOpen ? 'Close the drawer' : 'Open the drawer'}/>
      </ToggleDrawerButton>
      <MySortableContainer
        useDragHandle
        lockAxis={'y'}
        lockToContainerEdges
        helperClass='pop' // This adds a nice shadow to the card when moving it
        onSortEnd={({ oldIndex, newIndex }) => {
          return reorderChallenges({
            oldIndex,
            newIndex,
          });
        }}
      >
        {challenges.map((challenge, index) => (
          <SortableChallengeWrapper key={`item-${challenge.id}`}
                                    index={index}
                                    challenge={challenge}
                                    renderMethod={this.renderDrawerChallenge}/>
        ))}
      </MySortableContainer>
      <DrawerAlternative onClick={() => createChallenge()}>
        <DrawerIcon src={IconAdd} alt={'New challenge'}/>
      </DrawerAlternative>
    </Drawer>;
  }
}

const mapStateToProps = state => ({
  challenges: getChallenges(state),
  drawerOpen: getDrawerIsOpen(state)
});

const mapDispatchToProps = (dispatch) => {
  return ({
    reorderChallenges: payload => dispatch(challengeActions.reorderChallenges(payload)),
    createChallenge: () => dispatch(challengeActions.createChallenge()),
    toggleDrawer: () => dispatch(appSettingsActions.toggleDrawer()),
    selectChallenge: (challenge) => {
      dispatch(challengeActions.selectChallenge(challenge));
    },
    uploadChallengeImg: (challengeId, image) => dispatch(challengeActions.uploadChallengeImage({
      challengeId,
      image
    })),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDrawer);
