import React, { Component } from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { getGraphic } from '../../services/api/api-methods';
import IconPhotoPlaceholder from '../../../resources/images/photo_size_select_actual_24px.svg';

const DrawerIcon = styled.img`
  width:42px;
  margin: 4px;
`;

export default class MadImage extends Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired
  };
  state = { challenge: { graphicId: null } };

  componentWillReceiveProps = nextProps => {
    const incoming = !!nextProps.challenge.graphicId;
    const current = !!this.state.challenge.graphicId;

    const theyAreNotEqual = nextProps.challenge.graphicId !== this.state.challenge.graphicId;

    if (!incoming && !current || !incoming && current) {
      this.usePlaceholderImage();
    } else if (incoming && !current || incoming && current && theyAreNotEqual) {
      this.updateImage(nextProps.challenge.graphicId);
    }
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
    return <>
      <DrawerIcon
        src={this.state.img || IconPhotoPlaceholder}
        alt={`#${this.state.challenge.graphicId}`}/></>;
  }

}
