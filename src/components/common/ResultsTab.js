import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import * as PropTypes from 'prop-types';
import { Button, Typography } from '@equinor/eds-core-react';
import iconPlaceholderCircle from '../../../resources/images/simba.svg';
import {
  getActiveTab,
  getMeasuresModalIsShowing,
  getResultsModalIsShowing
} from '../../store/appSettings/reducer';
import { getSelectedChallenge } from '../../store/challenges/reducer';
import * as appSettingsActions from '../../store/appSettings/actions';
import * as combinationActions from '../../store/combinations/actions';
import {
  getCombinations,
  getInvalidCombinations,
  getMissingCombinations,
  getSelectedCombination
} from '../../store/combinations';
import { getPlaceholderText, getText } from '../../utils/helpers';
import { getAllQuestionsAreAnswered, getQuestions } from '../../store/questions';
import ImageDrop from './ImageDrop';
import { getMeasures } from '../../store/measures';
import * as measuresActions from '../../store/measures/actions';

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
  letter-spacing: 1px;
`;


const MissingCombinationsSection = styled.div`
  display: flex;
  justify-content: space-between;

  padding-bottom: 24px;
`;

const PaddingContainer = styled.div`
  padding: 28px;

  flex-direction: column;
  display: flex;
`;

const PillContainer = styled.span`

  justify-content: ${props => {
  return props.center ? 'center' : 'space-between';
}};

  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #007079;

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

   ${props => props.size === 'small' && css` width:70%;height:80%;`}
`;
const ModalGrid = styled.div`
display: grid;
  overflow-y: auto;
`;

const renderTableRow = (combination, onClick) => {
  return (
    <TableRow onClick={() => onClick(combination)}>
      <TableData>
        <Button variant={'ghost'}>
          {combination.keyNumber}
        </Button>
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
    // Selectors
    selectedChallenge: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,

    missingCombinations: PropTypes.array.isRequired,
    invalidCombinations: PropTypes.array.isRequired,

    combinations: PropTypes.array.isRequired,
    selectedCombination: PropTypes.array.isRequired,

    measures: PropTypes.array.isRequired,

    resultsModalIsShowing: PropTypes.bool.isRequired,
    measuresModalIsShowing: PropTypes.bool.isRequired,

    // Actions | Combinations
    selectCombination: PropTypes.func.isRequired,

    showResultsModal: PropTypes.func.isRequired,
    hideResultsModal: PropTypes.func.isRequired,

    createOrUpdateCombination: PropTypes.func.isRequired,
    setSelectedCombinationText: PropTypes.func.isRequired,
    uploadCombinationImg: PropTypes.func.isRequired,

    // Actions | Measures
    fetchMeasures: PropTypes.func.isRequired,

    showMeasuresModal: PropTypes.func.isRequired,
    hideMeasuresModal: PropTypes.func.isRequired,

    addMeasure: PropTypes.func.isRequired,
    removeMeasure: PropTypes.func.isRequired,

  };
  state = {
    showResultsModal: false
  };


  render() {
    const tableHeaders = ['Svarkombinasjoner', 'Risiko', 'Beskrivelse av konsekvens', 'Tiltakskort',];
    const {
      resultsModalIsShowing,
      measuresModalIsShowing,
      selectedChallenge,
      showResultsModal,
      hideResultsModal,
      showMeasuresModal,
      hideMeasuresModal,
      combinations,
      questions,
      missingCombinations,
      invalidCombinations,
      selectedCombination,
      selectCombination,
      createOrUpdateCombination,
      setSelectedCombinationText,
      addMeasure,
      removeMeasure,
      measures,
      fetchMeasures,
      uploadCombinationImg,
    } = this.props;

    const combinationModalTopBar = () => <ModalTopBar>
      <Typography variant={'h2'}>Rediger Resultat
        | {getText(selectedChallenge) || getPlaceholderText(selectedChallenge)}</Typography>
      <Button variant="ghost" onClick={() => hideResultsModal()}>Done</Button>
    </ModalTopBar>;

    const getQuestionsSection = () => <div>
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
              <AnswerText selected={answer.isSelected} variant={'ghost'}>
                ({answer.id}) {getText(answer) || getPlaceholderText(answer)}
              </AnswerText>
            </AnswerGroup>);
          })}
          <hr/>
        </div>;
      })}
    </div>;

    const getRiskSection = () => {
      return <div>
        <Typography variant={'h3'}>Sett risikograd og beskrivelse av konsekvens</Typography>
        <hr/>
        <select value={selectedCombination.risk}
                onChange={(change) => {
                  createOrUpdateCombination({
                    ...selectedCombination,
                    risk: change.target.value,
                  });
                }}>
          <option value={'Green'}>Alt OK</option>
          <option value={'Yellow'}>Vis Hensyn</option>
          <option value={'Red'}>Tiltak Anbefales</option>
        </select>
        <ImageDrop parentEntity={selectedCombination} uploadImg={uploadCombinationImg}/>
        <MultilineInput
          placeholder={getPlaceholderText(selectedCombination) || 'Beskrivelse av konsekvens... '}
          value={getText(selectedCombination) || ''}
          onChange={(change) => setSelectedCombinationText(change.target.value)}
        />
      </div>;
    };

    const getMeasureSection = () => <div>
      <Typography variant={'h3'}>Velg tiltakskort</Typography>
      <hr/>
      <Button variant="ghost"
              onClick={() => {
                fetchMeasures();
                showMeasuresModal();
              }}>+ Legg til tiltak</Button>
      {selectedCombination.measures && selectedCombination.measures.map(measure => {
        return <Button variant={'ghost'}>
          <img src={measure.graphic} alt={''}/>
          {getText(measure) || getPlaceholderText(measure) || 'No Title'}
        </Button>;
      })}
    </div>;

    function renderCombinationModal() {
      return <ModalWrapper>
        <Modal>
          {combinationModalTopBar()}
          <ModalGrid>
            {getQuestionsSection()}
            {getRiskSection()}
            {getMeasureSection()}
          </ModalGrid>
        </Modal>
      </ModalWrapper>;
    }

    function renderMeasuresModal() {
      return <ModalWrapper>
        <Modal size={'small'}>
          <ModalTopBar>
            <Typography variant={'h2'}>Tiltak</Typography>
            <Button variant="contained" onClick={() => hideMeasuresModal()}>Done</Button>
          </ModalTopBar>
          <div style={{ overflowY: 'auto' }}>
            {measures.length > 0 && measures
              .map(measure => {
                const measureIsAdded = selectedCombination.measures.findIndex(m => m.id === measure.id) !== -1;
                return <div>
                  <p>{getText(measure) || getPlaceholderText(measure) || 'Tiltak mangler text'}</p>
                  <input type={'checkbox'} checked={measureIsAdded}
                         onChange={(e) => e.target.checked ? addMeasure(measure, selectedCombination.id) : removeMeasure(measure, selectedCombination.id)}/>
                  <ImageDrop parentEntity={measure}/>
                </div>;
              })}
          </div>
        </Modal>
      </ModalWrapper>;
    }

    return (<>
        <PaddingContainer>
          <MissingCombinationsSection>
            {missingCombinations.length > 0 &&
            <div>
              <h2>Resterende Kombinasjoner ({missingCombinations.length})</h2>
              <p>Klikk på en kombinasjon for å legge den til.</p>

              <PillGrid>
                {missingCombinations.map(combination => {
                  return <Button variant={'ghost'} onClick={() => {
                    createOrUpdateCombination(combination);
                  }}>
                    {combination.keyNumber}
                  </Button>;
                })}
              </PillGrid>
            </div>
            }
          </MissingCombinationsSection>

          {invalidCombinations.length > 0 && <>
            <Typography variant="h3">Ugyldige Kombinasjoner</Typography>
            {renderTable(tableHeaders, combinations, () => showResultsModal())}</>
          }
          <Typography variant="h3">Kombinasjoner</Typography>
          {combinations.length > 0 ?
            renderTable(tableHeaders, combinations, (combination) => {
              selectCombination(combination);
            })
            :
            <p> {selectedChallenge ? 'Ingen kombinasjoner for valgt utfordring' : 'Velg en utfordring'}</p>
          }
        </PaddingContainer>

        {resultsModalIsShowing && renderCombinationModal()}
        {measuresModalIsShowing && renderMeasuresModal()}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  activeTab: getActiveTab(state),
  selectedChallenge: getSelectedChallenge(state),
  questions: getQuestions(state),
  resultsModalIsShowing: getResultsModalIsShowing(state),
  measuresModalIsShowing: getMeasuresModalIsShowing(state),
  combinations: getCombinations(state),
  missingCombinations: getMissingCombinations(state),
  invalidCombinations: getInvalidCombinations(state),
  allQuestionsAreAnswered: getAllQuestionsAreAnswered(state),
  selectedCombination: getSelectedCombination(state),
  measures: getMeasures(state),
});

const mapDispatchToProps = dispatch => ({
  fetchMeasures: () => dispatch(measuresActions.fetchMeasures()),
  showResultsModal: () => dispatch(appSettingsActions.showResultsModal()),
  hideResultsModal: () => dispatch(appSettingsActions.hideResultsModal()),
  showMeasuresModal: () => dispatch(appSettingsActions.showMeasuresModal()),
  hideMeasuresModal: () => dispatch(appSettingsActions.hideMeasuresModal()),
  selectCombination: (combination) => dispatch(combinationActions.selectCombination(combination)),
  addMeasure: (measure, combinationId) => dispatch(combinationActions.addMeasureToCombination({
    measure,
    measureId: measure.id,
    combinationId
  })),
  createOrUpdateCombination: (combination) => dispatch(combinationActions.creatOrUpdateCombination(combination)),
  setSelectedCombinationText: (text) => dispatch(combinationActions.setSelectedCombinationText({
    newCombinationText: text
  })),
  uploadCombinationImg: (combinationId, image) => dispatch(combinationActions.uploadCombinationImage({
    combinationId,
    image
  })),
  removeMeasure: (measure, combinationId) => dispatch(combinationActions.removeMeasureFromCombination({
    measure,
    measureId: measure.id,
    combinationId
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTab);
