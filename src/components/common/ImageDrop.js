import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { getGraphic } from '../../services/api/api-methods';
import placeholderImg from '../../../resources/images/photo_size_select_actual_24px.svg';

const ImageDropZone = styled.div`
  width:52px;
  height:44px;
  border: 2px dashed #007079;
  background-color: #F7F7F7;
  border-radius: 8px;

  overflow: hidden;
  text-align: center;
  align-content: center;
  align-items: center;
`;

const DrawerIcon = styled.img`
  width:52px;
  height:44px;
  object-fit: cover;
`;

class ImageDrop extends Component {

  static propTypes = {
    uploadImg: PropTypes.func.isRequired,
    parentEntityId: PropTypes.number,
    graphicId: PropTypes.number,
  };
  static defaultProps = { graphicId: null, parentEntityId: null };
  state = {
    img: null,
    graphicId: null
  };


  componentWillReceiveProps = nextProps => {
    if (nextProps.graphicId) {
      this.updateImage(nextProps.graphicId);
    } else {
      this.usePlaceholderImage();
    }
  };

  onDrop = (files) => {
    const { parentEntityId, uploadImg } = this.props;
    files.forEach((file) => {
      const reader = new FileReader();
      // reader.onabort = () => console.log('file reading was aborted');
      // reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        const binaryStr = await reader.result;
        const blob = await new Blob([binaryStr], { type: 'image/jpeg' });
        uploadImg(parentEntityId, blob);
        // remember to update the graphic locally
        const img = URL.createObjectURL(blob);
        this.setState({ img });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  usePlaceholderImage = () => this.setState({ img: null });

  updateImage = graphicId => {
    // todo: use memoization
    getGraphic(graphicId)
      .then(response => response.blob())
      .then(blob => {
        const img = URL.createObjectURL(blob);
        this.setState({ img });
      });
  };

  render() {
    const { parentEntityId, graphicId } = this.props;
    const { img } = this.state;
    if (graphicId && !img) {
      this.updateImage(graphicId);
    }
    return (
      <>
        {parentEntityId ?
          <Dropzone accept={'image/*'} onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <ImageDropZone {...getRootProps()}>
                  <input {...getInputProps()} />
                  {this.state.img
                    ? <DrawerIcon
                      src={this.state.img}
                      alt={`graphicId ${graphicId}`}/>
                    : <p>Drop image</p>
                  }
                </ImageDropZone>
              </section>
            )}
          </Dropzone>
          :
          <DrawerIcon src={placeholderImg}/>
        }
      </>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ImageDrop);

