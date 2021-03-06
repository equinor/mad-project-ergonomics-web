import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import ReactMarkdown from 'react-markdown/with-html';
import { Button } from '@equinor/eds-core-react';
import './SortableContainerStyle.css';
import ImageDrop from '../components/common/ImageDrop';
import { getText } from '../utils/helpers';
import { getMeasures } from '../store/measures';
import * as measuresActions from '../store/measures/actions';
import { getCurrentLanguage } from '../store/languages';


const Wrapper = styled.div`
  flex: 1;
  padding:24px;
`;

class Measures extends Component {
  static propTypes = {
    fetchMeasures: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    measures: PropTypes.arrayOf(PropTypes.object).isRequired,
    uploadImg: PropTypes.func.isRequired,
    newMeasure: PropTypes.func.isRequired
  };

  state = { filter: '' };

  componentDidMount() {
    this.props.fetchMeasures();
  }

  render() {
    const { measures, uploadImg } = this.props;
    if (!measures.length && measures.length > 0) {
      return <Wrapper>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <h1>No measures</h1>
          <Button
            onClick={() => {
              this.props.newMeasure((measure) => this.props.history.push(`measure/${measure.id}`));
            }}>Opprett
            tiltakskort</Button>
        </div>
      </Wrapper>;
    }
    return <Wrapper>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h1>Measures</h1>
        <Button
          onClick={() => {
            this.props.newMeasure((measure) => this.props.history.push(`measure/${measure.id}`));
          }}>Opprett
          tiltakskort</Button>
      </div>
      <label htmlFor="filter" style={{ paddingBottom:12}}>
        <input id={'filter'} type="text" placeholder={'Filter'} value={this.state.filter}
               onChange={(e) => this.setState({ filter: e.target.value })}/>
      </label>

      <div style={{ overflowY: 'auto' }}>
        {measures
          .filter(m =>
            `${getText(m)}`.toLowerCase()
              .includes(`${this.state.filter}`.toLowerCase())
          )
          .map(measure => {
            return <div
              key={measure.id}
              style={{
                borderBottom: '1px solid #E6E6E6',
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom:12,
                paddingTop:12
              }}>
              <ImageDrop uploadImg={uploadImg} parentEntity={measure}/>
              <div style={{ flex: 1, marginLeft: 12, marginRight: 12 }}>
                <ReactMarkdown
                  source={getText(measure)}
                  escapeHtml={false}
                />
              </div>

              <Button
                onClick={(() => this.props.history.push(`measure/${measure.id}`))}
              >Edit
              </Button>
            </div>;
          })}
      </div>
    </Wrapper>;
  }

}

const mapStateToProps = (state) => ({
  language: getCurrentLanguage(state),
  measures: getMeasures(state),
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
    newMeasure: (callback) => dispatch(measuresActions.createMeasure({ callback }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Measures);
