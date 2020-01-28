import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import * as PropTypes from 'prop-types';
import { Button, Typography } from '@equinor/eds-core-react';
import iconPlaceholderCircle from '../../../resources/images/simba.svg';
import { getActiveTab, getResultsModalIsShowing } from '../../store/appSettings/reducer';
import * as challengeActions from '../../store/challenges/actions';
import { getSelectedChallenge } from '../../store/challenges/reducer';
import * as appSettingsActions from '../../store/appSettings/actions';
import * as combinationActions from '../../store/combinations/actions';
import * as questionActions from '../../store/questions/actions';
import {
  getCombinations,
  getInvalidCombinations,
  getMissingCombinations,
  getSelectedCombination
} from '../../store/combinations';
import { getPlaceholderText, getText } from '../../utils/helpers';
import { getAllQuestionsAreAnswered, getQuestions } from '../../store/questions';
import ImageDrop from './ImageDrop';


const LoadingView = styled.div`
  padding: 20vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MultilineInput = styled.textarea`
  border: 0 solid white;
  border-bottom: 1px solid #243746;

  background: #F7F7F7;
  border-radius: 4px 4px 0 0;
  padding: 12px 12px 0 12px;
  margin:  12px 0 0 0  ;

  width: 100%;
  min-height:200px;
  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  //align-items: center;
  letter-spacing: 1px;
  //text-wrap: normal;
`;


const TopColumn = styled.div`
  display: flex;
  justify-content: space-between;

  padding-bottom: 24px;
`;
// const Button = styled.button`
//   border: 2px solid #007079;
//   border-radius: 4px;
//
//   color: ${props => props.outline ? '#007079' : '#FFFFFF'};
//   font-family: Equinor,sans-serif;
//   font-style: normal;
//   font-weight: 500;
//   font-size: 14px;
//   line-height: 16px;
//   display: flex;
//   align-items: center;
//   text-align: center;
//   letter-spacing: 1px;
//
//   background-color: ${props => props.outline ? '#FFFFFF' : '#007079'};
//   &:hover{
//     background-color:
//     ${props => props.outline ? '#C0E4E5' : '#008A8F'}
//   }
//   box-sizing: border-box;
//
//   padding:10px 36px;
//
// `;

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

const PillContainer = styled.span`
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
   grid-template-rows: 50px;
`;

const Spacer = styled.span`
  width:18px;
`;

const ModalGrid = styled.div`
display: grid;
grid-template-columns: auto auto auto;
grid-template-rows: auto auto;
`;

const renderTableRow = (combination, onClick) => {
  return (
    <TableRow onClick={() => onClick(combination)}>
      <TableData>
        {/* <PillContainer center> */}
        <Button variant={'ghost'}>
          {combination.keyNumber}
        </Button>
        {/* </PillContainer> */}
      </TableData>
      <TableData>
        <StatusPill status={combination.risk}/></TableData>
      <TableData>
        {getText(combination) || getPlaceholderText(combination) || 'Ingen beskrivelse'}
      </TableData>
      <TableData>
        {combination.measures && combination.measures.map(measureCard => {
          return <PillContainer>
            <img src={iconPlaceholderCircle} alt={'measure'}/>
            {getText(measureCard) || getPlaceholderText(measureCard) || 'Mangler navn på tiltak'}
            <div/>
          </PillContainer>;
        })}
      </TableData>
    </TableRow>
  );
};

function renderTable(tableHeaders, combinations, onClick) {
  return (
    <Table>
      <thead>
      <TableRow>
        {tableHeaders.map(text => <TableHeader>{text}</TableHeader>)}
      </TableRow>
      </thead>
      <tbody>
      {combinations.map(combination => renderTableRow(combination, onClick))}
      </tbody>
    </Table>
  );
}

const PillGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  grid-gap: 10px;
`;
const ModalTopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height:40px;
`;
const ModalGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AnswerGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const Radio = styled.div`
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
  color: black;

${props => props.checked && css`
  background-color: #007079;
  color: #FFFFFF;
`};

font-size: 20px;
text-align: center;
`;

const AnswerText = styled.div`
padding-left: 12px;
padding-right: 12px;
color:black;
${props => props.selected && css`
  color: #007079;

`};

`;

const alphas = 'ABCDEFGHIJKLMNOPGRSTUVWXYZ';

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
    invalidCombinations: PropTypes.array.isRequired,
    selectedCombination: PropTypes.array.isRequired,
    createOrUpdateCombination: PropTypes.func.isRequired
  };
  state = {
    showModal: false
  };


  render() {
    const tableHeaders = ['Svarkombinasjoner', 'Risiko', 'Beskrivelse av konsekvens', 'Tiltakskort',];
    const { modalIsShowing, selectedChallenge, showModal, hideModal, combinations, questions, missingCombinations, invalidCombinations, selectedCombination } = this.props;
    return (<>
        <PaddingContainer>

          <TopColumn>
            {missingCombinations.length > 0 &&
            <div>
              <h2>Resterende Kombinasjoner ({this.props.missingCombinations.length})</h2>
              <p>Klikk på en kombinasjon for å legge den til.</p>

              <PillGrid>
                {this.props.missingCombinations.map(combination => {
                  return <Button variant={'ghost'} onClick={() => {
                    // const answerIdArray = combination.answers.map(answer => answer.id);
                    // const combination = { answers: comb.answers, };
                    console.log(combination);
                    this.props.selectCombination(combination);
                    this.props.selectAnswers(combination.answers.map(answer => answer.id));
                    showModal();
                  }}>
                    {combination.keyNumber}
                  </Button>;
                })}
              </PillGrid>

            </div>
            }
          </TopColumn>

          {invalidCombinations.length > 0 && <>
            <Typography variant="h3">Ugyldige Kombinasjoner</Typography>
            {renderTable(tableHeaders, combinations, () => showModal())}</>
          }
          <Typography variant="h3">Kombinasjoner</Typography>
          {combinations.length > 0 ?
            renderTable(tableHeaders, combinations, (combination) => {
              console.log(combination);
              this.props.selectCombination(combination);
              this.props.selectAnswers(combination.answers.map(answer => answer.id));
              showModal();
            })
            :
            <p> {selectedChallenge ? 'Ingen kombinasjoner for valgt utfordring' : 'Velg en utfordring'}</p>

          }
        </PaddingContainer>

        {modalIsShowing &&
        <ModalWrapper>
          <Modal>
            <ModalTopBar>
              <ModalGroup>
                <Typography variant={'h2'}>Rediger Resultat</Typography>
              </ModalGroup>
              <Button variant="ghost" onClick={() => hideModal()}>Done</Button>
            </ModalTopBar>
            <ModalGrid>
              <div>
                <Typography
                  variant={'h3'}>{selectedCombination.keyNumber} ({selectedCombination.answers ? selectedCombination.answers.map(a => a.id)
                  .toString() : 'ingen svar'})</Typography>
                <hr/>
                {questions && questions.map((question, index) => {
                  return <div>
                    <h2>{`${index + 1}. ${getText(question)}` || getPlaceholderText(question)}</h2>
                    {question.answers && question.answers.map((answer, answerIndex) => {
                      return (<AnswerGroup key={answer.id}>
                        <Radio checked={answer.isSelected}>{alphas[answerIndex]}</Radio>
                        <AnswerText selected={answer.isSelected}
                                    variant={'ghost'}>({answer.id}) {getText(answer) || getPlaceholderText(answer)}</AnswerText>
                      </AnswerGroup>);
                    })}
                    <hr/>
                  </div>;
                })}
              </div>
              <div>
                <Typography variant={'h3'}>
                  Sett risikograd og beskrivelse av konsekvens
                </Typography>
                <hr/>
                <select value={selectedCombination.risk}
                        onChange={(change) => {
                          this.props.createOrUpdateCombination({
                            ...selectedCombination,
                            risk: change.target.value,
                          });
                        }}>
                  <option value={null}>--Ikke satt--</option>
                  <option value={'Green'}>All
                    good!
                  </option>
                  <option value={'Yellow'}>Vis
                    Hensyn
                  </option>
                  <option value={'Red'}>Tiltak
                    anbefales
                  </option>
                </select>
                <ImageDrop parentEntity={selectedCombination} uploadImg={(e) => console.log(e)}/>
                <MultilineInput
                  placeholder={getPlaceholderText(selectedCombination) || 'Beskrivelse av konsekvens... '}
                  value={getText(selectedCombination) || ''}
                  onChange={(change) => this.props.setSelectedCombinationText(change.target.value)}
                />
              </div>
              <div>
                <Typography variant={'h3'}>Velg tiltakskort</Typography>
                <hr/>
                <Button variant="ghost"
                        onClick={() => console.log('Legg til tiltak for kombinasjon', {
                          selectedCombination,
                          selectedChallenge
                        })}>+
                  Legg til
                  tiltak</Button>

                {selectedCombination.measures && selectedCombination.measures.map(measure => {
                  return <Button variant={'outlined'}>
                    <img src={measure.graphic} alt={''}/>
                    {getText(measure) || getPlaceholderText(measure) || 'No Title'}
                  </Button>;
                })}
              </div>
            </ModalGrid>

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
  allQuestionsAreAnswered: getAllQuestionsAreAnswered(state),
  selectedCombination: getSelectedCombination(state),
  invalidCombinations: getInvalidCombinations(state)
});

const mapDispatchToProps = dispatch => ({
  fetchChallenges: () => dispatch(challengeActions.fetchChallenges()),
  showModal: () => dispatch(appSettingsActions.showResultsModal()),
  hideModal: () => dispatch(appSettingsActions.hideResultsModal()),
  fetchCombinations: (challengeId) => dispatch(combinationActions.fetchCombinations(challengeId)),
  fetchMissingCombinations: (challengeId) => dispatch(combinationActions.fetchMissingCombinations(challengeId)),
  selectAnswer: (answerId) => dispatch(questionActions.selectAnswer({ answerId })),
  selectAnswers: (answerIdArray) => dispatch(questionActions.selectAnswers({ answerIdArray })),
  selectCombination: (combination) => dispatch(combinationActions.selectCombination(combination)),
  addMeasure: (measureId, combinationId) => console.log({ measureId, combinationId }),
  createOrUpdateCombination: (combination) => dispatch(combinationActions.creatOrUpdateCombination(combination)),
  setSelectedCombinationText: ( text) => dispatch(combinationActions.setSelectedCombinationText({
    newCombinationText: text
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTab);
