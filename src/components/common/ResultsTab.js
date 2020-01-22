import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import iconPlaceholderCircle from '../../../resources/images/simba.svg';
import ImageDrop from './ImageDrop';
import { getActiveTab, getResultsModalIsShowing } from '../../store/appSettings/reducer';
import * as challengeActions from '../../store/challenges/actions';
import { getSelectedChallenge } from '../../store/challenges/reducer';
import * as appSettingsActions from '../../store/appSettings/actions';
import * as combinationActions from '../../store/combinations/actions';
import * as questionActions from '../../store/questions/actions';
import { getCombinations, getMissingCombinations } from '../../store/combinations';
import { getPlaceholderText, getText } from '../../utils/helpers';
import { getAllQuestionsAreAnswered, getQuestions } from '../../store/questions';

const LoadingView = styled.div`
  padding: 20vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


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
  if (props.status === 'Red') {
    return '#FF0E2C';
  }
  if (props.status === 'Yellow') {
    return '#FFCA00';
  }
  if (props.status === 'Green') {
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
    <TableRow onClick={onClick}>
      <TableData>
        <PillContainer center>
          {combination.keyNumber}
        </PillContainer></TableData>
      <TableData>
        <StatusPill status={combination.risk}/></TableData>
      <TableData>
        {getText(combination.currentTranslation) || 'Missing text'}
      </TableData>
      <TableData>
        {combination.measures && combination.measures.map(measureCard => {
          return <PillContainer>
            <img src={iconPlaceholderCircle} alt={'measure'}/>
            {getText(measureCard.currentTranslation) || 'No Title'}
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
`;
const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class ResultsTab extends Component {
  static propTypes = {
    modalIsShowing: PropTypes.bool.isRequired,
    selectedChallenge: PropTypes.object.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    combinations: PropTypes.array.isRequired,
    missingCombinations: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired,
    selectAnswers: PropTypes.func.isRequired,
    allQuestionsAreAnswered: PropTypes.bool.isRequired
  };
  state = {
    showModal: false
  };

  render() {
    const tableHeaders = ['Svarkombinasjoner', 'Risiko', 'Beskrivelse av konsekvens', 'Tiltakskort',];
    const { modalIsShowing, selectedChallenge, showModal, hideModal, combinations, questions, allQuestionsAreAnswered } = this.props;
    return (<>
        <PaddingContainer>

          <TopColumn>
            {this.props.missingCombinations.length > 0 &&
            <div>
              <h2>Resterende Kombinasjoner ({this.props.missingCombinations.length})</h2>
              <p>Klikk på en kombinasjon for å legge den til.</p>

              <PillGrid>
                {this.props.missingCombinations.map(comb => {
                  return <ClickableContainer onClick={() => {
                    const answerIdArray = comb.answers.map(answer => answer.id);
                    console.log(answerIdArray);
                    this.props.selectAnswers(answerIdArray);
                    showModal();
                  }}>
                    <PillContainer
                      center>{comb.keyNumber}</PillContainer>
                  </ClickableContainer>;
                })}
              </PillGrid>
            </div>
            }
          </TopColumn>

          {combinations.length > 0 ?
            renderTable(tableHeaders, combinations, () => showModal())
            : <LoadingView>
              <h2> {selectedChallenge ? 'No combinations for selected challenge' : 'Please select a challenge'}</h2>
            </LoadingView>
          }
        </PaddingContainer>

        {modalIsShowing &&
        <ModalWrapper>
          <Modal>
            <ModalTopBar>
              <ModalButtons>
                <img src={iconPlaceholderCircle} alt={'edit'}/>
                <h2>Rediger resultat</h2>
              </ModalButtons>
              <ModalButtons>
                <Button outline onClick={() => hideModal()}>Avbryt</Button>
                <Spacer/>
                {allQuestionsAreAnswered &&
                <Button onClick={() => hideModal()}>Lagre</Button>}
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

                {questions && questions.map(question => {
                    return <span>
                    <h2>{getText(question) || getPlaceholderText(question)}</h2>
                     <div>
                        {question.answers.map(answer => {
                          return <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            // alignContent: 'center'
                          }}>
                            <input type="radio" checked={answer.isSelected}
                                   disabled
                              // onClick={() => selectAnswer(answer.id)}
                            />
                            <p>{getText(answer) || getPlaceholderText(answer)}</p>
                          </div>;
                        })}
                    </div>
                      </span>;
                  }
                )}
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
  combinations: getCombinations(state),
  missingCombinations: getMissingCombinations(state),
  questions: getQuestions(state),
  allQuestionsAreAnswered: getAllQuestionsAreAnswered(state)
});

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(challengeActions.fetchChallenges()),
  showModal: () => dispatch(appSettingsActions.showResultsModal()),
  hideModal: () => dispatch(appSettingsActions.hideResultsModal()),
  fetchCombinations: (challengeId) => dispatch(combinationActions.fetchCombinations(challengeId)),
  fetchMissingCombinations: (challengeId) => dispatch(combinationActions.fetchMissingCombinations(challengeId)),
  selectAnswer: (answerId) => dispatch(questionActions.selectAnswer({ answerId })),
  selectAnswers: (answerIdArray) => dispatch(questionActions.selectAnswers({ answerIdArray }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTab);
