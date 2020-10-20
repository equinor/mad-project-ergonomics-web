import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown/with-html';
import { toast, ToastContainer } from 'react-toastify';
import { getMeasures } from '../store/measures';
import { getCurrentLanguage } from '../store/languages';
import * as measuresActions from '../store/measures/actions';
import ImageDrop from '../components/common/ImageDrop';

const Wrapper = styled.div`
  padding:24px;
  flex: 1;
`;

const Button = styled.button`
  border-radius: 10px;
  width: 80px;
  height: 40px;
  border-width: 0;
  background-color:${props => props.danger ? '#ff9d9d' : null}
`;

class EditMeasure extends Component {
  static propTypes = {
    fetchMeasures: PropTypes.func.isRequired,
    measures: PropTypes.array.isRequired,
    uploadImg: PropTypes.func.isRequired,
    updateMeasureText: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    deleteMeasure: PropTypes.func.isRequired
  };

  state = { measure: null };
  // eslint-disable-next-line react/sort-comp
  timer;
  firstTime = true;
  currentLang;

  componentDidMount() {
    this.props.fetchMeasures();
  }

  componentWillReceiveProps(nextProps) {
    const { match, measures } = this.props;
    if (nextProps.measures !== measures) {
      const id = match.params.id;
      const measure = nextProps.measures.find(m => `${m.id}` === `${id}`);
      this.setState({ measure });
    }
  }

  update(text) {

    // LOCAL STATE
    const measure = _.cloneDeep(this.state.measure);
    if (!measure.currentTranslation) measure.currentTranslation = {};
    measure.currentTranslation.text = text;
    this.setState({ measure });

    // EXTERNAL STATE
    const languageCode = this.props.language.code;
    // Do not post request on initial load or when changing language
    if (this.currentLang !== languageCode) {
      this.currentLang = languageCode;
    } else {
      // If timer exists, stop the old one
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.props.updateMeasureText(measure.id, text, languageCode);
        toast(`Lagrer endring`);
      }, 1000);
    }
  }

  render() {
    const { measure } = this.state;
    const { uploadImg } = this.props;

    if (!measure) {
      return <Wrapper>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button onClick={() => this.props.history.goBack()}>Gå tilbake</Button>
          <h1>No measure {this.props.match.params.id}</h1>
          <div style={{
            borderRadius: 10,
            width: 80,
            height: 40,
            borderWidth: 0,
            marginRight: 12,
            backgroundColor: '#efefef',
          }}/>
        </div>
      </Wrapper>;
    }
    const { id } = measure;
    let { currentTranslation } = measure;
    if (!currentTranslation) currentTranslation = { text: '' };
    const { text } = currentTranslation;

    return (
      <Wrapper>
        <ToastContainer
          // enableMultiContainer
          autoClose={2000}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          position={'bottom-right'}
          // onClick={() => toast('Undooo it!')}
        />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button onClick={() => this.props.history.goBack()}>Gå tilbake</Button>
          <h1>Edit measure {id}</h1>
          <Button danger onClick={() => {
            this.props.deleteMeasure(measure.id, () => {
              toast(`Slettet tiltak ${measure.id}`);
              setTimeout(() => this.props.history.goBack(), 2000);
            });
          }}>Slett</Button>
        </div>
        <hr/>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <ImageDrop uploadImg={uploadImg} parentEntity={measure}/>
          <div style={{ flex: 1, paddingLeft: 12 }}>
            <MDEditor value={text} onChange={t => {
              this.update(t);
            }}/>
          </div>
        </div>
        {!text && measure.suggestedTranslation && measure.suggestedTranslation.text &&
        <div style={{
          padding: 8,
          marginTop: 8,
          borderRadius: 4,
          backgroundColor: '#fbfbfb',
          borderWidth: 1
        }}>
          <h2>Missing translation</h2>
          <p>Denne oversettelsen er ikke lagt inn. Men vi har en oversettelse på ett annet
            språk.</p>
          <h2>Language Code: {measure.suggestedTranslation.languageCode}</h2>
          <hr/>
          <ReactMarkdown
            source={measure.suggestedTranslation.text}
            escapeHtml={false}
          />
        </div>
        }
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  measures: getMeasures(state),
  language: getCurrentLanguage(state)
});

const mapDispatchToProps = dispatch => {
  return {
    fetchMeasures: () => dispatch(measuresActions.fetchMeasures()),
    uploadImg: (measureId, image) => dispatch(measuresActions.uploadMeasureImage({
      measureId,
      image
    })),
    updateMeasureText: (measureId, newText, languageCode) => dispatch(measuresActions.updateMeasureText({
      measureId,
      newText,
      languageCode
    })),
    deleteMeasure: (measureId,callback) => dispatch(measuresActions.deleteMeasure({ measureId ,callback }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMeasure);
