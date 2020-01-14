import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SortableContainerStyle.css';
import * as challengeActions from '../store/challenges/actions';
import ChallengeDrawer from '../components/common/ChallengeDrawer';
import ChallengeHeader from '../components/common/ChallengeHeader';
import AppMenuBar from '../components/common/AppMenuBar';
import ChallengeBody from '../components/common/ChallengeBody';

const Column = styled.div`
  display: flex;
  flex: 1;
`;

const Wrapper = styled.div`
  flex: 1;
`;

class MainPage extends Component {
  static propTypes = {
    fetchChallenges: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchChallenges();
  }

  render() {
    return <>
      <ToastContainer
        enableMultiContainer
        autoClose={8000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        // onClick={() => toast('Undooo it!')}
      />
      <Column>
        <ChallengeDrawer/>
        <Wrapper>
          <AppMenuBar/>
          <ChallengeHeader/>
          <ChallengeBody/>
        </Wrapper>
      </Column>
    </>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(challengeActions.fetchChallenges()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
