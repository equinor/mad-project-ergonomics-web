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
import iconPlaceholderCircle from '../../resources/images/simba.svg';
import { getActiveTab } from '../store/appSettings/reducer';

const TopColumn = styled.div`
  display: flex;
  justify-content: space-between;

  padding-bottom: 24px;
`;
const Wrapper = styled.div`
  flex: 1;
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
  &:hover{
    background-color: #008A8F;
  }
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
  &:hover{
 background-color:#EFF8F8;
 border-radius: 8px;
  }
`;

const PaddingContainer = styled.div`
  padding: 28px;

  flex-direction: column;
  display: flex;
`;

const PillContainer = styled.div`
  background: #F7F7F7;
  border-radius: 20px;

  height:32px;
  margin:4px;
  padding: 4px;
  align-items: center;
  display: flex;
  flex-direction: row;

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
  width:100%;
`;

const TableHeader = styled.th`
  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  padding: 16px;
  height: 54px;
  background-color: #F7F7F7;
  border-bottom:  1px solid #E6E6E6;
`;

const TableRow = styled.tr`
    border-bottom:  1px solid #E6E6E6;
     &:hover {
      background-color: #FAFAFA;
      cursor: pointer;
    }
`;

const TableData = styled.td`
    padding: 16px;
    max-width: 1000px;
`;

const renderTableRow = combination => {
  return (
    // eslint-disable-next-line no-console
    <TableRow onClick={() => console.log(combination)}>
      <TableData>
        <PillContainer center>
          {combination.combination}
        </PillContainer></TableData>
      <TableData>
        <StatusPill status={combination.risk}/></TableData>
      <TableData>
        {combination.description}
      </TableData>
      <TableData>
        {combination.measureCards.map(measureCard => {
          return <PillContainer>
            <img src={iconPlaceholderCircle} alt={'measure'}/>
            {measureCard.title}
            <div/>
          </PillContainer>;
        })}
      </TableData>
    </TableRow>
  );
};

function renderTable(tableHeaders, combinations) {
  return (
    <Table>
      <thead>
      <TableRow>
        {tableHeaders.map(text => <TableHeader>{text}</TableHeader>)}
      </TableRow>
      </thead>
      <tbody>
      {combinations.map(combination => renderTableRow(combination))}
      </tbody>
    </Table>
  );
}

const ResultsTab = () => {
  const tableHeaders = ['Svarkombinasjoner', 'Risiko', 'Beskrivelse av konsekvens', 'Tiltakskort',];
  const combinations = [{
    combination: '1A,2A,3A',
    risk: 'GO',
    description: 'Lorem ipsum dolor osv osv osv osv...',
    measureCards: [{ title: 'Tiltaksnavn #1' },]
  }, {
    combination: '1B,2A,3A',
    risk: 'WAIT',
    description: 'Lorem ipsum dolor osv osv osv osv...',
    measureCards: [{ title: 'Tiltaksnavn #1' }, { title: 'Et lengre tiltaksnavn #2' },]
  }, {
    combination: '1C,2A,3A',
    risk: 'STOP',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing\n' +
      '                elit, sed do eiusmod tempor\n' +
      '                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis\n' +
      '                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    measureCards: [{ title: 'Tiltaksnavn #1' }, { title: 'Tiltaksnavn #2' }, { title: 'Tiltaksnavn #3' }, { title: 'Tiltaksnavn #4' }, { title: 'Tiltaksnavn #5' },]
  }, {
    combination: '1A,2A,3A',
    risk: 'GO',
    description: 'Lorem ipsum dolor osv osv osv osv...',
    measureCards: [{ title: 'Tiltaksnavn #1' },]
  }, {
    combination: '1B,2A,3A',
    risk: 'WAIT',
    description: 'Lorem ipsum dolor osv osv osv osv...',
    measureCards: [{ title: 'Tiltaksnavn #1' }, { title: 'Tiltaksnavn #2' },]
  }, {
    combination: '1C,2A,3A',
    risk: 'STOP',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing\n' +
      '                elit, sed do eiusmod tempor\n' +
      '                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis\n' +
      '                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    measureCards: [{ title: 'Tiltaksnavn #1' }, { title: 'Tiltaksnavn #2' }, { title: 'Tiltaksnavn #3' }, { title: 'Tiltaksnavn #4' }, { title: 'Tiltaksnavn #5' },]
  }, {
    combination: '1A,2A,3A',
    risk: 'GO',
    description: 'Lorem ipsum dolor osv osv osv osv...',
    measureCards: [{ title: 'Tiltaksnavn #1' },]
  }, {
    combination: '1B,2A,3A',
    risk: 'WAIT',
    description: 'Lorem ipsum dolor osv osv osv osv...',
    measureCards: [{ title: 'Tiltaksnavn #1' }, { title: 'Tiltaksnavn #2' },]
  }, {
    combination: '1C,2A,3A',
    risk: 'STOP',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing\n' +
      '                elit, sed do eiusmod tempor\n' +
      '                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis\n' +
      '                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    measureCards: [{ title: 'Tiltaksnavn #1' }, { title: 'Tiltaksnavn #2' }, { title: 'Tiltaksnavn #3' }, { title: 'Tiltaksnavn #4' }, { title: 'Tiltaksnavn #5' },]
  },];
  return (
    <PaddingContainer>
      <TopColumn>
        {/* eslint-disable-next-line no-console */}
        <ClickableContainer onClick={() => console.log('Se resterende svarkombinasjoner')}>
          <img src={iconInfo} alt={'info'}/> Se resterende svarkombinasjoner (8)
        </ClickableContainer>
        {/* eslint-disable-next-line no-console */}
        <Button onClick={() => console.log('NEW RESULTAT!')}>Nytt resultat</Button>
      </TopColumn>
      {renderTable(tableHeaders, combinations)}
    </PaddingContainer>
  );
};

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
        // onClick={() => toast('Undooo it!')}
      />
      <Row>
        <ChallengeDrawer/>
        <Wrapper>
          <AppMenuBar/>
          {this.props.activeTab === 'Questions' ?
            <QuestionsTab/>
            : <ResultsTab/>
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
