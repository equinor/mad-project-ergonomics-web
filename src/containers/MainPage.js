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
import iconInfo from '../../resources/images/info.svg';
import iconPlaceholderCircle from '../../resources/images/placeholderCircle.svg';
import iconClose from '../../resources/images/close.svg';

const TopColumn = styled.div`
  display: flex;
  justify-content: space-between;

  padding-bottom: 24px;
`;
const Wrapper = styled.div`
  flex: 1;
`;

const Icon = styled.img`
  width:24px;
  height:24px;
`;

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

  padding:10px 36px;
`;

const ClickableContainer = styled.button`
  border: 0 solid #FFFFFF;
  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1px;

  background-color: transparent;


  align-items: center;
  justify-items: center;
  /* Moss Green/ 55 */
  color: #73B1B5;
`;

const PaddingContainer = styled.div`
  padding: 28px;
`;

const PillContainer = styled.div`
  background: #F7F7F7;
  border-radius: 20px;

  height:32px;
  width: 200px;
  margin:4px;
  padding:4px;

  display: flex;
  flex-direction: row;

  //justify-content: space-between;
  justify-content: ${props => {
  return props.center ? 'center' : 'space-between';
}};

  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #007079;

  max-width: 200px;

  text-overflow:ellipsis ;
  overflow: hidden;
  white-space: nowrap;
`;

const StatusPill = styled.div`
  width: 12px;
  height: 34px;
  border-radius: 20px;

  background-color: ${props => {
  if (props.status === 'STOP') {
    return '#FF0E2C';
  }
  if (props.status === 'WAIT') {
    return '#FFCA00';
  }
  if (props.status === 'GO') {
    return '#00BB32';
  }
  return '#909090';
}};

`;
const QuestionsTab = () => <>
  <ChallengeHeader/>
  <ChallengeBody/>
</>;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const Table = styled.table`
  //border-collapse: collapse;
    //border: 5px solid black;

  //flex: 1;
`;

const TableHeader = styled.th`
  font-size: 18px;

  padding: 16px;
  height: 54px;
  background-color: #F7F7F7;
  border-bottom:  1px solid #E6E6E6;
`;

const TableRow = styled.tr`
    border-bottom:  1px solid #E6E6E6;
`;

const TableData = styled.td`
    padding: 16px;
  //flex:1;
  //display: grid;
  //border: 1px solid #666666;
  //background-color: blue;
`;

const renderTableRow = combination => <TableRow>
  <TableData>
    <PillContainer center>
      {combination.combination}
    </PillContainer></TableData>
  <TableData>
    <StatusPill status={'GO'}/></TableData>
  <TableData>
    <Row>
      <p>{combination.description}</p>
    </Row>
  </TableData>
  <TableData>
    <PillContainer>
      <Icon src={iconPlaceholderCircle}/>
      {combination.measureCards[0].title}
      <ClickableContainer>
        <Icon src={iconClose}/>
      </ClickableContainer>
    </PillContainer>
  </TableData>
</TableRow>;

const ResultsTab = () => {
  const headerOne = 'Svarkombinasjoner';
  const headerTwo = 'Risiko';
  const headerThree = 'Beskrivelse av konsekvens';
  const headerFour = 'Tiltakskort';
  const combinations = [{
    combination: '1A,2A,3A',
    risk: 'GO',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing\n' +
      '                elit, sed do eiusmod tempor\n' +
      '                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis\n' +
      '                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    measureCards: [{ title: 'Tiltaksnavn #1' }, { title: 'Tiltaksnavn #1' }, { title: 'Tiltaksnavn #1' },]
  }];
  return (
    <PaddingContainer>
      <TopColumn>
        <ClickableContainer onClick={() => console.log('Se resterende svarkombinasjoner')}>
          <Icon src={iconInfo}/> Se resterende svarkombinasjoner (8)
        </ClickableContainer>
        <Button onClick={() => console.log('NEW RESULTAT!')}>Nytt resultat</Button>
      </TopColumn>

      <Table>
        <TableRow>
          <TableHeader> {headerOne} </TableHeader>
          <TableHeader>{headerTwo}</TableHeader>
          <TableHeader>{headerThree}</TableHeader>
          <TableHeader>{headerFour}</TableHeader>
        </TableRow>

        {renderTableRow(combinations[0])}
        {renderTableRow(combinations[0])}
        {renderTableRow(combinations[0])}
      </Table>
    </PaddingContainer>
  )
    ;
};

class MainPage extends Component {
  static propTypes = {
    fetchChallenges: PropTypes.func.isRequired,
    activeTab: PropTypes.string,
  };

  static defaultProps = {
    // activeTab: 'QUESTIONS'
    activeTab: 'RESULTS'
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
      <Row>
        <ChallengeDrawer/>
        <Wrapper>
          <AppMenuBar/>
          {this.props.activeTab === 'QUESTIONS' ?
            <QuestionsTab/>
            : <ResultsTab/>
          }
        </Wrapper>
      </Row>
    </>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(challengeActions.fetchChallenges()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
