import React, { Component } from 'react';
import iconInfo from '../../../resources/images/info.svg';
import iconPlaceholderCircle from '../../../resources/images/simba.svg';
import ImageDrop from './ImageDrop';
import { getActiveTab, getResultsModalIsShowing } from '../../store/appSettings/reducer';
import * as challengeActions from '../../store/challenges/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getSelectedChallenge } from '../../store/challenges/reducer';
import * as appSettingsActions from '../../store/appSettings/actions';


const TopColumn = styled.div`
  display: flex;
  justify-content: space-between;

  padding-bottom: 24px;
`;
const Button = styled.button`
  border: 2px solid #007079;
  border-radius: 4px;

  color: ${props => props.outline ? '#007079' : '#FFFFFF'};
  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 1px;

  background-color: ${props => props.outline ? '#FFFFFF' : '#007079'};
  &:hover{
    background-color:
    ${props => props.outline ? '#C0E4E5' : '#008A8F'}
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
  padding: 12px;
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

// Setting up the backdrop for the modal
const ModalWrapper = styled.div`
  position: fixed;
  top:0;
  left:0;
  background-color: rgba(0,0,0,0.4);
  width:100%;
  height:100%;
`;
const Modal = styled.div`
  padding:32px;
  background-color: #FFFFFF;
  width:90%;
  height:90%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

   display: grid;
  grid-auto-rows: minmax(100px, auto);
`;

const Spacer = styled.span`
  width:18px;
`;

const renderTableRow = (combination, onClick) => {
  return (
    // eslint-disable-next-line no-console
    <TableRow onClick={onClick}>
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

function renderTable(tableHeaders, combinations, onClickRow) {
  return (
    <Table>
      <thead>
      <TableRow>
        {tableHeaders.map(text => <TableHeader>{text}</TableHeader>)}
      </TableRow>
      </thead>
      <tbody>
      {combinations.map(combination => renderTableRow(combination, onClickRow))}
      </tbody>
    </Table>
  );
}

const PillGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  grid-gap: 10px;
`;
const ModalTopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height:40px;
  //background-color: blue;
`;
const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class ResultsTab extends Component {
  state = {
    showModal: false
  };

  render() {
    const tableHeaders = ['Svarkombinasjoner', 'Risiko', 'Beskrivelse av konsekvens', 'Tiltakskort',];
    const results = [{
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
    return (<>
        <PaddingContainer>
          <TopColumn>
            {/* eslint-disable-next-line no-console */}
            <ClickableContainer onClick={() => this.props.showModal()}>
              <img src={iconInfo} alt={'info'}/> Se resterende svarkombinasjoner (8)
            </ClickableContainer>
            {/* eslint-disable-next-line no-console */}
            <Button onClick={() => this.props.showModal()}>Nytt resultat</Button>
          </TopColumn>
          {renderTable(tableHeaders, results, () => this.props.showModal())}
        </PaddingContainer>

        {this.props.modalIsShowing &&
        <ModalWrapper>
          <Modal>
            <ModalTopBar>
              <ModalButtons>
                <img src={iconPlaceholderCircle} alt={'edit'}/>
                <h2>Rediger resultat</h2>
              </ModalButtons>
              <ModalButtons>
                <Button outline onClick={() => this.props.hideModal()}>Avbryt</Button>
                <Spacer/>
                <Button onClick={() => this.props.hideModal()}>Lagre</Button>
              </ModalButtons>
            </ModalTopBar>
            <Row>
              <div className="question" style={{
                flex: 1,
                overflowY: 'scroll'
              }}>
                <h2 style={{
                  backgroundColor: '#F7F7F7',
                  height: '50px',
                  alignContent: 'center',
                  padding: '16px'
                }}>1. Velg besvarelse</h2>
                <h3>Hvilken stilling har du i ryggen når du utfører jobben?</h3>
                <ul>
                  <li>Mellom 0 -20º bøy eller rotasjon</li>
                  <li>Mellom 20- 60º bøy eller rotasjon</li>
                  <li>Mer enn 60º bøy eller rotasjon</li>
                </ul>
                <h3>Hvilken stilling har du i ryggen når du utfører jobben?</h3>
                <ul>
                  <li>Mellom 0 -20º bøy eller rotasjon</li>
                  <li>Mellom 20- 60º bøy eller rotasjon</li>
                  <li>Mer enn 60º bøy eller rotasjon</li>
                </ul>
                <h3>Hvilken stilling har du i ryggen når du utfører jobben?</h3>
                <ul>
                  <li>Mellom 0 -20º bøy eller rotasjon</li>
                  <li>Mellom 20- 60º bøy eller rotasjon</li>
                  <li>Mer enn 60º bøy eller rotasjon</li>
                </ul>
              </div>

              <div className="risk" style={{ flex: 1, overflowY: 'scroll' }}>
                <h2 style={{
                  backgroundColor: '#F7F7F7',
                  height: '50px',
                  alignContent: 'center',
                  padding: '16px'
                }}>2. Sett risikograd og gi beskrivelse av konsekvens</h2>
                Risikograd: /vis hensyn/
                <br/>
                <ImageDrop/>Velg figur
                <br/>
                <input/>
              </div>

              <div className="measure" style={{
                // border: '1px solid #E6E6E6',
                flex: '2',
                overflowY: 'scroll'
              }}>
                <h2 style={{
                  backgroundColor: '#F7F7F7',
                  height: '50px',
                  alignContent: 'center',
                  padding: '16px'
                }}>3. Velg tiltakskort</h2>
                <br/>
                <ClickableContainer>
                  + Legg til tiltakskort
                </ClickableContainer>
                <br/>
                <br/>

                <PillGrid>
                  <PillContainer>
                    <img src={iconPlaceholderCircle} alt={'measure'}/>
                    Tiltaksnavn #1
                    <div/>
                  </PillContainer>
                  <PillContainer>
                    <img src={iconPlaceholderCircle} alt={'measure'}/>
                    Tiltaksnavn #1
                    <div/>
                  </PillContainer>
                  <PillContainer>
                    <img src={iconPlaceholderCircle} alt={'measure'}/>
                    Tiltaksnavn #1
                    <div/>
                  </PillContainer>
                  <PillContainer>
                    <img src={iconPlaceholderCircle} alt={'measure'}/>
                    Tiltaksnavn #1
                    <div/>
                  </PillContainer>
                </PillGrid>
              </div>

            </Row>
            <div>
              <hr/>
              <h3>Resterende kombinasjoner</h3>
              <p>Klikk på en resterende kombinasjon for å legge den til.</p>
              <PillGrid>
                <PillContainer center>1A,2A,3A</PillContainer>
                <PillContainer center>1A,2A,3A</PillContainer>
                <PillContainer center>1A,2A,3A</PillContainer>
                <PillContainer center>1A,2A,3A</PillContainer>
                <PillContainer center>1A,2A,3A</PillContainer>
                <PillContainer center>1A,2A,3A</PillContainer>
                <PillContainer center>1A,2A,3A</PillContainer>
                <PillContainer center>1A,2A,3A</PillContainer>
                <PillContainer center>1A,2A,3A</PillContainer>
              </PillGrid>
            </div>

          </Modal>
        </ModalWrapper>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  activeTab: getActiveTab(state),
  selectedChallenge: getSelectedChallenge(state),
  modalIsShowing: getResultsModalIsShowing(state),
});

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(challengeActions.fetchChallenges()),
  showModal: () => dispatch(appSettingsActions.showResultsModal()),
  hideModal: () => dispatch(appSettingsActions.hideResultsModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTab);
