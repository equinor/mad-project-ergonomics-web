import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import IconClose from '../../../resources/images/close_24px.svg';
import IconAdd from '../../../resources/images/add_24px.svg';
import IconDelete from '../../../resources/images/delete_24px.svg';
import IconDragNode from '../../../resources/images/dragNode.svg';
import * as questions from '../../store/questions/actions';
import { getPlaceholderText, getText } from '../../utils/helpers';
import ImageDrop from './ImageDrop';
import { getCurrentLanguage } from '../../store/languages';

const TextInput = styled.input`
  border: 0 solid white;
  border-bottom: 1px solid #243746;

  flex:1;
  background-color: #F7F7F7;
  border-radius: 4px 4px 0 0;
  height:60px;
  padding: 0 30px 0;

  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
`;

const ImagePlaceholderContainer = styled.div`
  display: flex;
  border-radius: 8px;
  margin:10px 15px;

   ${props =>
  props.invisible &&
  css`
      background-color: transparent;
    `};
`;

const QuestionBox = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid #E6E6E6;
  padding:28px 0 0 0;
  margin:24px;
  min-width: 500px;
  width:60vw;
  max-width: 900px;
`;

const AnswerBox = styled.div`
  padding-top: 18px;
  display: flex;
  padding-left: 64px;
  padding-right: 64px;
`;

const TransparentButton = styled.button`
  font-family: Equinor,sans-serif;

  font-style: normal;
  font-weight: 500;
  font-size: 1em;
  line-height: 16px;

  display: flex;
  align-items: center;
  letter-spacing: 1px;

  color: #007079;
  background-color: transparent;

  border: 0 solid white;

  margin-left: 116px;
  padding: 20px 64px;
`;

const DeleteQuestionButton = styled.button`
  border: 0 solid white;
  background-color: transparent;
  padding: 8px 72px;
`;


const DeleteAlternativeButtonContainer = styled.button`
    background-color: transparent;
    border: 0 solid white;
    margin:10px 20px;
`;

const ChallengeBoxBottomActionsBox = styled.div`
    display: flex;
    flex-direction: row-reverse;
    border-top: 1px solid #E6E6E6;
    padding: 16px;
`;

const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const DragHandle = SortableHandle(() => {
  return <div style={{ padding: 8, paddingLeft: 16, paddingRight: 16 }}>
    <img src={IconDragNode}
         alt={'Drag handle for reordering questions'}/>
  </div>;
});

const AnswerDragHandle = SortableHandle(() => {
  return <img src={IconDragNode}
              alt={'Drag handle for reordering answers'}/>;
});


const SortableAnswerWrapper = SortableElement(({ answer, question, deleteAction, updateAnswerText, uploadAnswerImg, languageCode }) => {
  return <AnswerBox key={answer.id}>
    <AnswerDragHandle/>
    <ImagePlaceholderContainer>
      <ImageDrop parentEntity={answer} uploadImg={uploadAnswerImg}/>
    </ImagePlaceholderContainer>
    <TextInput
      placeholder={getPlaceholderText(answer) || 'Write an answer here'}
      value={getText(answer) || ''}
      onChange={(change) => {
        const newText = change.target.value;
        return updateAnswerText(question.id,
          answer.id,
          newText, languageCode);
      }}/>
    <DeleteAlternativeButtonContainer
      onClick={() => deleteAction({ answer, question })}>
      <img src={IconClose} alt={'Delete alternative'}
      />
    </DeleteAlternativeButtonContainer>
  </AnswerBox>;
});

const MySortableContainer = SortableContainer(({ children }) => {
  return <ul>{children}</ul>;
});

class Question extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    removeQuestion: PropTypes.func.isRequired,
    reorderAnswer: PropTypes.func.isRequired,
    removeAnswer: PropTypes.func.isRequired,
    addAlternative: PropTypes.func.isRequired,
    updateQuestionText: PropTypes.func.isRequired,
    updateAnswerText: PropTypes.func.isRequired,
    uploadAnswerImg: PropTypes.func.isRequired,
    currentLanguage: PropTypes.object.isRequired
  };

  render() {
    const { question, reorderAnswer, removeAnswer, addAlternative, updateQuestionText, updateAnswerText, uploadAnswerImg, currentLanguage } = this.props;
    return <QuestionBox key={`question.id:${question.id}`}>
      <AlignCenter>
        <DragHandle/>
      </AlignCenter>
      <AnswerBox>
        <TextInput
          placeholder={getPlaceholderText(question) || 'Question title...'}
          value={getText(question) || ''}
          onChange={(change) => {
            const newText = change.target.value;
            updateQuestionText(question.id, newText, currentLanguage.code);
          }}
        />
      </AnswerBox>
      <MySortableContainer
        useDragHandle
        lockAxis={'y'}
        lockToContainerEdges
        helperClass='pop'
        onSortEnd={({ oldIndex, newIndex }) => reorderAnswer({
          oldIndex,
          newIndex,
          question
        })}>
        {question.answers.map((answer, index) =>
          <SortableAnswerWrapper key={`answer-${answer.id}`} answer={answer} index={index}
                                 question={question} deleteAction={removeAnswer}
                                 updateAnswerText={updateAnswerText}
                                 uploadAnswerImg={uploadAnswerImg}
                                 languageCode={this.props.currentLanguage.code}/>
        )}
      </MySortableContainer>
      <TransparentButton onClick={() => addAlternative(question.id)}>
        <img src={IconAdd} alt={'Add answer'}/>
        Legg til nytt alternativ
      </TransparentButton>

      <ChallengeBoxBottomActionsBox>
        <DeleteQuestionButton onClick={() => {
          toast(`Deleted question "${getText(question)}"`);
          return this.props.removeQuestion(question);
        }}>
          <img src={IconDelete} alt={'Delete answer'}/>
        </DeleteQuestionButton>
      </ChallengeBoxBottomActionsBox>
    </QuestionBox>;
  }
}

const mapStateToProps = (state) => ({
  currentLanguage: getCurrentLanguage(state),
});

const mapDispatchToProps = dispatch => ({
  removeQuestion: question => dispatch(questions.removeQuestion(question)),
  reorderAnswer: payload => dispatch(questions.reorderAnswers(payload)),
  removeAnswer: payload => dispatch(questions.removeAlternative(payload)),
  addAlternative: (questionId) => dispatch(questions.addAlternative(questionId)),
  updateQuestionText: (questionId, newText, languageCode) => dispatch(questions.updateQuestionText({
    questionId,
    newText,
    languageCode
  })),
  updateAnswerText: (questionId, answerId, newText, languageCode) => dispatch(questions.updateAnswerText({
    questionId,
    answerId,
    newText,
    languageCode
  })),
  uploadAnswerImg: (answerId, image) => dispatch(questions.uploadAnswerImage({ answerId, image })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

