import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
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
  border-radius: 8px;
  object-fit: cover;
`;

class ImageDrop extends Component {

  static propTypes = {
    parentEntity: PropTypes.object.isRequired,
    uploadImg: PropTypes.func,
  };

  static defaultProps = {
    uploadImg: null,
  };

  state = {
    img: null
  };

  onDrop = (files) => {
    const { parentEntity, uploadImg } = this.props;
    files.forEach((file) => {
      const reader = new FileReader();
      // reader.onabort = () => console.log('file reading was aborted');
      // reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        const binaryStr = await reader.result;
        const blob = await new Blob([binaryStr], { type: 'image/jpeg' });
        uploadImg(parentEntity.id, blob);
        // remember to update the graphic locally
        const img = URL.createObjectURL(blob);
        this.setState({ img });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  getImageSrc(parentEntity) {
    if (this.state.img) {
      return this.state.img;
    }
    if (parentEntity && parentEntity.graphic && parentEntity.graphic.url) {
      return parentEntity.graphic.url;
    }
    return placeholderImg;
  }

  render() {
    const { parentEntity, uploadImg } = this.props;

    // We cannot update the graphic
    if (!uploadImg) {
      return <DrawerIcon
        src={this.getImageSrc(parentEntity)}/>;
    }

    // We may update the graphic
    return <Dropzone accept={'image/*'} onDrop={this.onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <ImageDropZone {...getRootProps()}>
            <input {...getInputProps()} />
            <DrawerIcon src={this.getImageSrc(parentEntity)}/>
          </ImageDropZone>
        </section>
      )}
    </Dropzone>;

  }
}


const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ImageDrop);

