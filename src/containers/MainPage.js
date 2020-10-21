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
import ChallengeBody from '../components/common/ChallengeBody';
import { getActiveTab } from '../store/appSettings/reducer';
import ResultsTab from '../components/common/ResultsTab';

const Wrapper = styled.div`
  flex: 1;
`;
const QuestionsTab = () => <>
  <ChallengeHeader/>
  <ChallengeBody/>
</>;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

class MainPage extends Component {
  static propTypes = {
    fetchChallenges: PropTypes.func.isRequired,
    activeTab: PropTypes.string.isRequired,
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
      />
      <Row>
        <ChallengeDrawer/>
        <Wrapper>
          {this.props.activeTab === 'Questions' ?
            <QuestionsTab/>
            : <ResultsTab {...this.props} />
          }
        </Wrapper>
      </Row>
    </>;
  }
}

const mapStateToProps = (state) => ({
  activeTab: getActiveTab(state),
});

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(challengeActions.fetchChallenges()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
