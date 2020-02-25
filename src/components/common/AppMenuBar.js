import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import * as PropTypes from 'prop-types';
import { getActiveTab } from '../../store/appSettings/reducer';
import * as appSettingsActions from '../../store/appSettings/actions';


const MenuBar = styled.div`
  background: white;
  border-bottom: 2px solid #F7F7F7;
  padding-left: 2em;
  margin-bottom: 32px;
`;

const MenuBarButton = styled.button`
  color: #666666;

  font-family: Equinor,sans-serif;
  font-weight: 500;
  font-size: 1em;
  line-height: 1.143em;
  background: white;
  padding: 1em 2em;

  border: 0 solid white;

  &:hover{
    background-color: #EFF8F8;
    ${props => !props.active && css`
      border-bottom: 2px solid #EFF8F8;
    `}
  }

  ${props => props.active && css`
    border-bottom: 2px solid #007079;
    color: #007079;
  `};
`;

class AppMenuBar extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired
  };

  render() {
    const { activeTab } = this.props;
    const { setActiveTab } = this.props;
    return (
      <MenuBar>
        <MenuBarButton
          active={activeTab === 'Questions'}
          onClick={() => setActiveTab('Questions')}
        >
          Spørsmål
        </MenuBarButton>
        <MenuBarButton
          active={activeTab === 'Results'}
          onClick={() => setActiveTab('Results')}
        >
          Resultat og tiltak
        </MenuBarButton>
      </MenuBar>
    );
  }
}

const mapStateToProps = (state) => ({
  activeTab: getActiveTab(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveTab: (str) => dispatch(appSettingsActions.setActiveTab(str))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppMenuBar);

