import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { cloneDeep } from 'lodash';
import './SortableContainerStyle.css';
import ImageDrop from '../components/common/ImageDrop';
import { getPlaceholderText, getText } from '../utils/helpers';
import { getMeasures } from '../store/measures';
import * as measuresActions from '../store/measures/actions';
import { getCurrentLanguage } from '../store/languages';

const Wrapper = styled.div`
  padding:24px;
  flex: 1;
`;

class Measures extends Component {
  static propTypes = {
    fetchMeasures: PropTypes.func.isRequired,
    measures: PropTypes.arrayOf(PropTypes.object),
    uploadImg: PropTypes.func.isRequired,
    updateMeasureText: PropTypes.func.isRequired,
    language: PropTypes.object.isRequired,
  };

  static defaultProps = {
    measures: []
  };

  state = { filter: '', measures: [] };

  componentDidMount() {
    this.props.fetchMeasures();
  }

  timer = {};
  updateText(text, measure, language) {
    const languageCode = language.code;
    const newMeasures = cloneDeep(this.state.measures);
    if (this.timer && this.timer[measure.id]) {
      // If timer exists, stop the old one
      clearTimeout(this.timer[measure.id]);
    }
    newMeasures[measure.id] = { measure };
    newMeasures[measure.id].backgroundColor = 'orange';
    this.setState({
      measures: newMeasures
    });
    this.timer[measure.id] = setTimeout(() => {
      newMeasures[measure.id].backgroundColor = null;
      this.setState({
        measures: newMeasures
      });
      this.props.updateMeasureText(measure.id, text, languageCode);
    }, 2000);
  }

  render() {
    const { measures, uploadImg, language } = this.props;
    if (!measures.length && measures.length > 0) {
      return <div><p>No measures</p></div>;
    }
    return <Wrapper>
      <h1>Measures</h1>
      <label htmlFor="filter">
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
            return <div style={{
              display: 'flex',
              paddingBottom: 12,
              borderBottom: '1px solid #E6E6E6',
              marginBottom: '10px',
              justifyContent: 'space-between',
            }}>
              <p style={{ margin: 'auto', padding: 12 }}>{measure.id}</p>
              <ImageDrop uploadImg={uploadImg} parentEntity={measure}/>
              <textarea
                style={{
                  flex: 1,
                  marginLeft: 12,
                  marginRight: 12,
                  backgroundColor: !getText(measure) && '#F7F7F7'
                }}
                onChange={(e) => this.updateText(e.target.value, measure, language)}
                placeholder={getPlaceholderText(measure)}>{getText(measure)}</textarea>
              <div style={{
                borderRadius: 20,
                width: 40,
                height: 40,
                backgroundColor: !!this.state.measures[measure.id] && this.state.measures[measure.id].backgroundColor || '#00717A'
              }}/>
            </div>;
          })}
      </div>
    </Wrapper>;
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Measures);
